import { describe, expect, it } from "vitest";
import { useRunner, type RunnerExercise } from "@/lib/store/useRunner";

const exercises: RunnerExercise[] = [
  {
    id: "1",
    type: "MCQ",
    prompt: "Test",
    data: {},
    solution: {},
    difficulty: 1,
    skillCode: "NC-ADD-INT",
  },
  {
    id: "2",
    type: "NUMERIC",
    prompt: "Test",
    data: {},
    solution: {},
    difficulty: 2,
    skillCode: "NC-SUB-INT",
  },
];

describe("useRunner store", () => {
  it("flows through phases", () => {
    const store = useRunner.getState();
    store.setExercises(exercises);
    store.start();
    expect(useRunner.getState().phase).toBe("answering");
    store.submit(true, "Bravo");
    expect(useRunner.getState().phase).toBe("feedback");
    store.next();
    expect(useRunner.getState().currentIndex).toBe(1);
    store.next();
    expect(useRunner.getState().phase).toBe("completed");
  });

  it("reset clears state", () => {
    const store = useRunner.getState();
    store.reset();
    expect(useRunner.getState().phase).toBe("idle");
    expect(useRunner.getState().exercises).toHaveLength(0);
  });
});
