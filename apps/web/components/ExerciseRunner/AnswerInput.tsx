"use client";

import { useMemo } from "react";
import { MultipleChoice } from "./MultipleChoice";
import { NumericInput } from "./NumericInput";
import { DragDrop } from "./DragDrop";
import type { RunnerExercise } from "@/lib/store/useRunner";

interface AnswerInputProps {
  exercise: RunnerExercise;
  onSubmit: (payload: unknown) => void;
  disabled?: boolean;
}

export function AnswerInput({ exercise, onSubmit, disabled }: AnswerInputProps) {
  const component = useMemo(() => {
    switch (exercise.type) {
      case "MCQ":
        return <MultipleChoice options={exercise.data.options as string[]} onSubmit={onSubmit} disabled={disabled} />;
      case "NUMERIC":
        return <NumericInput onSubmit={onSubmit} disabled={disabled} tolerance={exercise.data.tolerance as number | undefined} />;
      case "DRAG":
        return <DragDrop pairs={exercise.data.pairs as { left: string; right: string }[]} onSubmit={onSubmit} disabled={disabled} />;
      default:
        return null;
    }
  }, [disabled, exercise.data, exercise.type, onSubmit]);

  return <div className="mt-6">{component}</div>;
}
