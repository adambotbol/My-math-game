"use client";

import { create } from "zustand";

export type RunnerPhase = "idle" | "answering" | "feedback" | "completed";

export interface RunnerExercise {
  id: string;
  type: "MCQ" | "NUMERIC" | "DRAG";
  prompt: string;
  data: Record<string, unknown>;
  solution: Record<string, unknown>;
  difficulty: number;
  skillCode: string;
}

interface RunnerState {
  exercises: RunnerExercise[];
  currentIndex: number;
  phase: RunnerPhase;
  lastResult?: { correct: boolean; explanation?: string };
  setExercises: (exercises: RunnerExercise[]) => void;
  start: () => void;
  submit: (isCorrect: boolean, explanation?: string) => void;
  next: () => void;
  reset: () => void;
}

export const useRunner = create<RunnerState>((set, get) => ({
  exercises: [],
  currentIndex: 0,
  phase: "idle",
  lastResult: undefined,
  setExercises: (exercises) => set({ exercises, currentIndex: 0, phase: "idle" }),
  start: () => set({ phase: "answering", currentIndex: 0 }),
  submit: (isCorrect, explanation) => {
    set({
      phase: "feedback",
      lastResult: { correct: isCorrect, explanation },
    });
  },
  next: () => {
    const { currentIndex, exercises } = get();
    if (currentIndex + 1 >= exercises.length) {
      set({ phase: "completed" });
    } else {
      set({ currentIndex: currentIndex + 1, phase: "answering" });
    }
  },
  reset: () => set({ currentIndex: 0, phase: "idle", exercises: [], lastResult: undefined }),
}));
