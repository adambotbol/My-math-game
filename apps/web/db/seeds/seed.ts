import { createClient } from "@supabase/supabase-js";
import skills from "./skills.json" assert { type: "json" };
import { seedUnits } from "./units.lessons.exercises";

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error("SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définis");
}

const supabase = createClient(url, serviceRoleKey, { auth: { persistSession: false } });

async function seedSkills() {
  for (const skill of skills) {
    await supabase.from("skills").upsert(skill, { onConflict: "code" });
  }
}

async function seedUnitsLessons() {
  const { data: skillRows } = await supabase.from("skills").select("id, code");
  const skillMap = new Map((skillRows ?? []).map((row) => [row.code, row.id]));

  for (const unit of seedUnits) {
    const { data: unitRow } = await supabase
      .from("units")
      .upsert({ slug: unit.slug, title: unit.title, order: unit.order }, { onConflict: "slug" })
      .select("id")
      .single();

    if (!unitRow) continue;

    for (const lesson of unit.lessons) {
      const lessonSkills = lesson.skillCodes
        .map((code) => skillMap.get(code))
        .filter((value): value is string => Boolean(value));

      const { data: lessonRow } = await supabase
        .from("lessons")
        .upsert(
          { slug: lesson.slug, title: lesson.title, unit_id: unitRow.id, skill_ids: lessonSkills },
          { onConflict: "slug" },
        )
        .select("id")
        .single();

      if (!lessonRow) continue;

      for (const exercise of lesson.exercises) {
        await supabase
          .from("exercises")
          .upsert(
            {
              lesson_id: lessonRow.id,
              prompt: exercise.prompt,
              type: exercise.type,
              data: exercise.data,
              solution: exercise.solution,
              difficulty: exercise.difficulty,
            },
            { onConflict: "lesson_id,prompt" },
          );
      }
    }
  }
}

async function seedBadges() {
  const badges = [
    {
      code: "FIRST_LESSON",
      title: "Première leçon",
      description: "Terminer une première leçon.",
      condition: { type: "lesson_count", threshold: 1 },
    },
    {
      code: "STREAK_3",
      title: "Flamme de bronze",
      description: "Maintenir 3 jours de suite.",
      condition: { type: "streak", threshold: 3 },
    },
    {
      code: "XP_500",
      title: "Explorateur", 
      description: "Gagner 500 XP.",
      condition: { type: "xp", threshold: 500 },
    },
  ];

  for (const badge of badges) {
    await supabase.from("badges").upsert(badge, { onConflict: "code" });
  }
}

async function main() {
  await seedSkills();
  await seedUnitsLessons();
  await seedBadges();
  console.log("🌱 Seeds insérés avec succès");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
