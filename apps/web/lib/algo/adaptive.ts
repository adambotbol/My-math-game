/**
 * Algorithme adaptatif simple inspiré d'un Elo : on ajuste un score de maîtrise par compétence
 * en fonction des tentatives récentes (pondérées).
 */

export type ExerciseType = "MCQ" | "NUMERIC" | "DRAG";

export interface AdaptiveAttempt {
  difficulty: 1 | 2 | 3;
  isCorrect: boolean;
  createdAt: string;
  type: ExerciseType;
}

export interface AdaptiveSuggestion {
  difficulty: 1 | 2 | 3;
  nextType: ExerciseType;
  masteryScore: number;
}

const BASE_SCORE = 1200;
const DIFFICULTY_WEIGHTS: Record<1 | 2 | 3, number> = {
  1: 0.9,
  2: 1,
  3: 1.1,
};
const TARGET_BY_DIFFICULTY: Record<1 | 2 | 3, number> = {
  1: 1100,
  2: 1200,
  3: 1300,
};

function computeScore(attempts: AdaptiveAttempt[]): number {
  let score = BASE_SCORE;
  const sorted = [...attempts].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  for (const attempt of sorted) {
    const expected = 1 / (1 + Math.pow(10, (TARGET_BY_DIFFICULTY[attempt.difficulty] - score) / 400));
    const actual = attempt.isCorrect ? 1 : 0;
    const weight = DIFFICULTY_WEIGHTS[attempt.difficulty];
    score = score + 40 * weight * (actual - expected);
  }

  return score;
}

function clampDifficulty(score: number): 1 | 2 | 3 {
  if (score < 1125) return 1;
  if (score < 1275) return 2;
  return 3;
}

function chooseNextType(attempts: AdaptiveAttempt[], difficulty: 1 | 2 | 3): ExerciseType {
  if (attempts.length === 0) return "MCQ";
  const recent = attempts.slice(-3);
  const byType = recent.reduce<Record<ExerciseType, { total: number; correct: number }>>(
    (acc, attempt) => {
      if (!acc[attempt.type]) {
        acc[attempt.type] = { total: 0, correct: 0 };
      }
      acc[attempt.type].total += 1;
      acc[attempt.type].correct += attempt.isCorrect ? 1 : 0;
      return acc;
    },
    { MCQ: { total: 0, correct: 0 }, NUMERIC: { total: 0, correct: 0 }, DRAG: { total: 0, correct: 0 } },
  );

  const weaknesses = Object.entries(byType)
    .map(([type, stats]) => ({ type: type as ExerciseType, accuracy: stats.total ? stats.correct / stats.total : 0.5 }))
    .sort((a, b) => a.accuracy - b.accuracy);

  const weakest = weaknesses[0];
  if (!weakest || weakest.accuracy > 0.8) {
    return difficulty === 3 ? "NUMERIC" : "MCQ";
  }
  return weakest.type;
}

export function suggestNextExercise(attempts: AdaptiveAttempt[]): AdaptiveSuggestion {
  const recent = attempts.slice(-10);
  const score = computeScore(recent);
  const difficulty = clampDifficulty(score);
  const nextType = chooseNextType(recent, difficulty);
  return { difficulty, nextType, masteryScore: Number(score.toFixed(2)) };
}

export function masteryFromAttempts(attempts: AdaptiveAttempt[]): number {
  if (attempts.length === 0) return 0.1;
  const success = attempts.reduce((acc, attempt, index) => {
    const decay = Math.pow(0.85, attempts.length - 1 - index);
    return acc + (attempt.isCorrect ? 1 : 0) * decay;
  }, 0);
  const totalWeight = attempts.reduce((acc, _attempt, index) => acc + Math.pow(0.85, attempts.length - 1 - index), 0);
  return Number((success / totalWeight).toFixed(2));
}
