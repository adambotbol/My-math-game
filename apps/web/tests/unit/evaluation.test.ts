import { describe, expect, it } from "vitest";
import { evaluateDragMatches, evaluateNumericAnswer } from "@/lib/utils/evaluation";

describe("evaluation helpers", () => {
  it("handles numeric tolerance", () => {
    expect(evaluateNumericAnswer(10, 10.1, 0.2)).toBe(true);
    expect(evaluateNumericAnswer(10, 10.3, 0.2)).toBe(false);
  });

  it("validates drag matches disregarding order", () => {
    const expected = [
      ["1/2", "0,5"],
      ["1/4", "0,25"],
    ];
    const received = [
      ["1/4", "0,25"],
      ["1/2", "0,5"],
    ];
    expect(evaluateDragMatches(expected, received)).toBe(true);
  });
});
