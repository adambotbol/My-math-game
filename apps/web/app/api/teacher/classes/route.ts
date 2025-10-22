import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/client";

const classSchema = z.object({
  name: z.string().min(3),
});

export async function POST(request: Request) {
  const payload = classSchema.safeParse(await request.json());
  if (!payload.success) {
    return NextResponse.json({ error: payload.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("user_id", user.id).single();
  if (profile?.role !== "teacher") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const inviteCode = Math.random().toString(36).slice(2, 8).toUpperCase();

  const { data, error } = await supabase
    .from("classes")
    .insert({ name: payload.data.name, invite_code: inviteCode, owner_id: user.id })
    .select("id, name, invite_code")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabase.from("class_members").insert({ class_id: data.id, user_id: user.id, role: "teacher" });

  return NextResponse.json({ class: data });
}
