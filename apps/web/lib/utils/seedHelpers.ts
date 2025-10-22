"use client";

import { useCallback } from "react";
import type { RunnerExercise } from "@/lib/store/useRunner";
import { evaluateDragMatches, evaluateNumericAnswer } from "@/lib/utils/evaluation";

export interface EvaluationResult {
  correct: boolean;
  explanation?: string;
}

export function useRunnerEvaluator() {
  return useCallback((exercise: RunnerExercise, payload: unknown): EvaluationResult => {
    switch (exercise.type) {
      case "MCQ": {
        const answer = (payload as { answer?: string })?.answer;
        const correctAnswer = exercise.solution.answer as string;
        const isCorrect = answer === correctAnswer;
        return {
          correct: isCorrect,
          explanation: isCorrect ? exercise.solution.feedbackCorrect : exercise.solution.feedbackWrong,
        };
      }
      case "NUMERIC": {
        const value = Number((payload as { value?: number }).value);
        const expected = Number(exercise.solution.value);
        const tolerance = Number(exercise.data.tolerance ?? 0);
        const isCorrect = evaluateNumericAnswer(expected, value, tolerance);
        return {
          correct: isCorrect,
          explanation: isCorrect ? exercise.solution.feedbackCorrect : exercise.solution.feedbackWrong,
        };
      }
      case "DRAG": {
        const matches = (payload as { matches?: [string, string][] }).matches ?? [];
        const isCorrect = evaluateDragMatches(exercise.solution.matches as [string, string][], matches);
        return {
          correct: isCorrect,
          explanation: isCorrect ? exercise.solution.feedbackCorrect : exercise.solution.feedbackWrong,
        };
      }
      default:
        return { correct: false };
    }
  }, []);
}
