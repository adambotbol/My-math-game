import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/client";
import { evaluateDragMatches, evaluateNumericAnswer } from "@/lib/utils/evaluation";

const attemptSchema = z.object({
  exerciseId: z.string(),
  type: z.enum(["MCQ", "NUMERIC", "DRAG"]),
  payload: z.unknown(),
});

export async function POST(request: Request) {
  const body = attemptSchema.safeParse(await request.json());
  if (!body.success) {
    return NextResponse.json({ error: body.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: exercise } = await supabase.from("exercises").select("id, type, data, solution, difficulty, lesson_id").eq("id", body.data.exerciseId).single();

  if (!exercise) {
    return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
  }

  let isCorrect = false;
  const solution = exercise.solution as Record<string, unknown>;

  switch (exercise.type) {
    case "MCQ":
      isCorrect = (body.data.payload as { answer?: string }).answer === solution.answer;
      break;
    case "NUMERIC": {
      const payloadValue = Number((body.data.payload as { value?: number }).value);
      const expected = Number(solution.value);
      const tolerance = Number((exercise.data as Record<string, unknown>).tolerance ?? 0);
      isCorrect = evaluateNumericAnswer(expected, payloadValue, tolerance);
      break;
    }
    case "DRAG": {
      const received = (body.data.payload as { matches?: [string, string][] }).matches ?? [];
      isCorrect = evaluateDragMatches((solution.matches as [string, string][]) ?? [], received);
      break;
    }
    default:
      isCorrect = false;
  }

  const gainedXP = isCorrect ? 10 * exercise.difficulty : 2;

  const { error } = await supabase.from("attempts").insert({
    user_id: user.id,
    exercise_id: exercise.id,
    is_correct: isCorrect,
    payload: body.data.payload,
    gained_xp: gainedXP,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await supabase.rpc("update_mastery_after_attempt", {
    p_user_id: user.id,
    p_lesson_id: exercise.lesson_id,
    p_is_correct: isCorrect,
  });

  await supabase.rpc("update_streak_for_user", {
    p_user_id: user.id,
    p_is_correct: isCorrect,
  });

  return NextResponse.json({ success: true, isCorrect, gainedXP });
}
