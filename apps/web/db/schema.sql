-- MathQuest 6e - Schéma Supabase

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  user_id uuid primary key references auth.users on delete cascade,
  username text unique,
  avatar text,
  role text check (role in ('student', 'teacher')) default 'student'
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  domain text not null,
  code text not null unique,
  label text not null,
  description text
);

create table if not exists public.units (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  "order" int not null default 0
);

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.units on delete cascade,
  slug text not null,
  title text not null,
  skill_ids uuid[] not null default '{}',
  unique (unit_id, slug)
);

create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons on delete cascade,
  type text not null check (type in ('MCQ', 'NUMERIC', 'DRAG')),
  prompt text not null,
  data jsonb not null default '{}',
  solution jsonb not null default '{}',
  difficulty int not null check (difficulty between 1 and 3)
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  exercise_id uuid not null references public.exercises on delete cascade,
  is_correct boolean not null,
  payload jsonb not null,
  gained_xp int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists attempts_user_idx on public.attempts (user_id, created_at desc);

create table if not exists public.progress (
  user_id uuid not null references auth.users on delete cascade,
  lesson_id uuid not null references public.lessons on delete cascade,
  mastery numeric not null default 0 check (mastery between 0 and 1),
  last_practiced timestamptz,
  primary key (user_id, lesson_id)
);

create table if not exists public.streaks (
  user_id uuid primary key references auth.users on delete cascade,
  current int not null default 0,
  best int not null default 0,
  last_day date
);

create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  description text,
  condition jsonb not null
);

create table if not exists public.user_badges (
  user_id uuid not null references auth.users on delete cascade,
  badge_id uuid not null references public.badges on delete cascade,
  awarded_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  invite_code text not null unique,
  owner_id uuid not null references auth.users on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.class_members (
  class_id uuid not null references public.classes on delete cascade,
  user_id uuid not null references auth.users on delete cascade,
  role text not null check (role in ('teacher', 'student')),
  joined_at timestamptz not null default now(),
  primary key (class_id, user_id)
);

create index if not exists class_members_user_idx on public.class_members (user_id);

-- Fonctions utilitaires pour l'algorithme adaptatif côté base
create or replace function public.update_mastery_after_attempt(p_user_id uuid, p_lesson_id uuid, p_is_correct boolean)
returns void as $$
declare
  current_mastery numeric := 0;
  attempts_count int := 0;
begin
  select mastery into current_mastery from public.progress where user_id = p_user_id and lesson_id = p_lesson_id;
  select count(*) into attempts_count from public.attempts a join public.exercises e on e.id = a.exercise_id where a.user_id = p_user_id and e.lesson_id = p_lesson_id;

  if current_mastery is null then
    insert into public.progress (user_id, lesson_id, mastery, last_practiced)
    values (p_user_id, p_lesson_id, case when p_is_correct then 0.2 else 0.05 end, now())
    on conflict (user_id, lesson_id) do update set mastery = excluded.mastery, last_practiced = excluded.last_practiced;
  else
    update public.progress
    set mastery = greatest(0, least(1, current_mastery + case when p_is_correct then 0.08 else -0.05 end)),
        last_practiced = now()
    where user_id = p_user_id and lesson_id = p_lesson_id;
  end if;
end;
$$ language plpgsql security definer;

grant execute on function public.update_mastery_after_attempt(uuid, uuid, boolean) to authenticated;

create or replace function public.update_streak_for_user(p_user_id uuid, p_is_correct boolean)
returns void as $$
declare
  today date := current_date;
  last_day date;
  current_streak int := 0;
  best_streak int := 0;
begin
  select current, best, last_day into current_streak, best_streak, last_day from public.streaks where user_id = p_user_id;

  if not found then
    insert into public.streaks (user_id, current, best, last_day)
    values (p_user_id, case when p_is_correct then 1 else 0 end, case when p_is_correct then 1 else 0 end, today)
    on conflict (user_id) do nothing;
    return;
  end if;

  if last_day = today - 1 then
    current_streak := current_streak + 1;
  elsif last_day = today then
    current_streak := current_streak;
  else
    current_streak := case when p_is_correct then 1 else 0 end;
  end if;

  if current_streak > best_streak then
    best_streak := current_streak;
  end if;

  update public.streaks
  set current = current_streak,
      best = best_streak,
      last_day = today
  where user_id = p_user_id;
end;
$$ language plpgsql security definer;

grant execute on function public.update_streak_for_user(uuid, boolean) to authenticated;

-- RLS
alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.streaks enable row level security;
alter table public.attempts enable row level security;
alter table public.classes enable row level security;
alter table public.class_members enable row level security;
alter table public.user_badges enable row level security;

create policy "Users can view their profile" on public.profiles for select using (auth.uid() = user_id);
create policy "Users can update their profile" on public.profiles for update using (auth.uid() = user_id);

create policy "Read own progress" on public.progress for select using (auth.uid() = user_id);
create policy "Upsert own progress" on public.progress for insert with check (auth.uid() = user_id);
create policy "Update own progress" on public.progress for update using (auth.uid() = user_id);

create policy "Read own streak" on public.streaks for select using (auth.uid() = user_id);
create policy "Update own streak" on public.streaks for update using (auth.uid() = user_id);
create policy "Insert own streak" on public.streaks for insert with check (auth.uid() = user_id);

create policy "Read own attempts" on public.attempts for select using (auth.uid() = user_id);
create policy "Insert own attempts" on public.attempts for insert with check (auth.uid() = user_id);

create policy "Teacher own classes" on public.classes for select using (auth.uid() = owner_id);
create policy "Teacher manage classes" on public.classes for insert with check (auth.uid() = owner_id);
create policy "Teacher update classes" on public.classes for update using (auth.uid() = owner_id);

create policy "Members view class" on public.class_members for select using (auth.uid() = user_id);
create policy "Owner adds members" on public.class_members for insert with check (
  auth.uid() = user_id
  or exists (select 1 from public.classes c where c.id = class_id and c.owner_id = auth.uid())
);

create policy "User badges view" on public.user_badges for select using (auth.uid() = user_id);
create policy "User badges insert" on public.user_badges for insert with check (auth.uid() = user_id);
