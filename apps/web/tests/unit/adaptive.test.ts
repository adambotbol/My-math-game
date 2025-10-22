import { describe, expect, it } from "vitest";
import { masteryFromAttempts, suggestNextExercise, type AdaptiveAttempt } from "@/lib/algo/adaptive";

const baseAttempt = (partial: Partial<AdaptiveAttempt>): AdaptiveAttempt => ({
  difficulty: 1,
  isCorrect: true,
  createdAt: new Date().toISOString(),
  type: "MCQ",
  ...partial,
});

describe("adaptive algorithm", () => {
  it("promote difficulty after successes", () => {
    const attempts = [
      baseAttempt({ difficulty: 1, isCorrect: true, createdAt: new Date(Date.now() - 60000).toISOString() }),
      baseAttempt({ difficulty: 1, isCorrect: true, createdAt: new Date(Date.now() - 30000).toISOString() }),
      baseAttempt({ difficulty: 2, isCorrect: true }),
    ];
    const suggestion = suggestNextExercise(attempts);
    expect(suggestion.difficulty).toBeGreaterThanOrEqual(2);
  });

  it("reduce difficulty after échecs", () => {
    const attempts = [
      baseAttempt({ difficulty: 3, isCorrect: false, createdAt: new Date(Date.now() - 60000).toISOString(), type: "NUMERIC" }),
      baseAttempt({ difficulty: 3, isCorrect: false, createdAt: new Date(Date.now() - 30000).toISOString(), type: "NUMERIC" }),
      baseAttempt({ difficulty: 2, isCorrect: false, type: "DRAG" }),
    ];
    const suggestion = suggestNextExercise(attempts);
    expect(suggestion.difficulty).toBeLessThanOrEqual(2);
    expect(["NUMERIC", "DRAG"].includes(suggestion.nextType)).toBe(true);
  });

  it("computes mastery with decay", () => {
    const attempts = [
      baseAttempt({ isCorrect: true, createdAt: new Date(Date.now() - 60000).toISOString() }),
      baseAttempt({ isCorrect: false, createdAt: new Date(Date.now() - 30000).toISOString() }),
      baseAttempt({ isCorrect: true }),
    ];
    const mastery = masteryFromAttempts(attempts);
    expect(mastery).toBeGreaterThan(0);
    expect(mastery).toBeLessThanOrEqual(1);
  });
});
