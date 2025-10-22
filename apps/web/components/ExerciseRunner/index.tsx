"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { AnswerInput } from "./AnswerInput";
import { QuestionStem } from "./QuestionStem";
import { Feedback } from "./Feedback";
import { Hints } from "./Hints";
import { Button } from "@/components/ui/button";
import { useRunner, type RunnerExercise } from "@/lib/store/useRunner";
import { useRunnerEvaluator } from "@/lib/utils/seedHelpers";

interface ExerciseRunnerProps {
  initialExercises: RunnerExercise[];
}

export function ExerciseRunner({ initialExercises }: ExerciseRunnerProps) {
  const { exercises, setExercises, phase, currentIndex, start, submit, next, lastResult } = useRunner();
  const evaluator = useRunnerEvaluator();

  useEffect(() => {
    setExercises(initialExercises);
    start();
  }, [initialExercises, setExercises, start]);

  const exercise = exercises[currentIndex];

  const hints = useMemo(() => (exercise?.data.hints as string[]) ?? [], [exercise?.data.hints]);

  if (!exercise) {
    return <p className="text-center text-sm text-slate-500">Chargement des exercices...</p>;
  }

  return (
    <div className="space-y-6">
      <QuestionStem prompt={exercise.prompt} />
      <Hints hints={hints} />
      <AnswerInput
        exercise={exercise}
        onSubmit={(payload) => {
          const { correct, explanation } = evaluator(exercise, payload);
          submit(correct, explanation);
        }}
        disabled={phase !== "answering"}
      />
      {phase === "feedback" && lastResult && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Feedback correct={lastResult.correct} explanation={lastResult.explanation} />
          <div className="mt-4 flex justify-end">
            <Button onClick={() => next()}>{currentIndex + 1 === exercises.length ? "Terminer" : "Question suivante"}</Button>
          </div>
        </motion.div>
      )}
      {phase === "completed" && (
        <div className="rounded-3xl bg-success/10 p-6 text-center text-success">
          <p className="text-lg font-bold">🎉 Bravo, session terminée !</p>
          <p className="text-sm text-success/80">Pythagou est fier de toi. Continue demain pour garder ta flamme.</p>
        </div>
      )}
    </div>
  );
}
