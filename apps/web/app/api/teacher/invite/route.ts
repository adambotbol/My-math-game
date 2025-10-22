import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/client";

const inviteSchema = z.object({
  classId: z.string(),
});

export async function POST(request: Request) {
  const payload = inviteSchema.safeParse(await request.json());
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

  const { data: klass } = await supabase.from("classes").select("id, owner_id").eq("id", payload.data.classId).single();

  if (!klass || klass.owner_id !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const inviteCode = Math.random().toString(36).slice(2, 8).toUpperCase();

  const { error } = await supabase.from("classes").update({ invite_code: inviteCode }).eq("id", klass.id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ inviteCode });
}
