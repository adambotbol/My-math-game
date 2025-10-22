import { ExerciseRunner } from "@/components/ExerciseRunner";
import type { RunnerExercise } from "@/lib/store/useRunner";

const exercises: RunnerExercise[] = [
  {
    id: "ex1",
    type: "MCQ",
    prompt: "Quel est le résultat de 27 + 18 ?",
    data: {
      options: ["35", "45", "47", "55"],
      hints: ["Additionne d'abord les dizaines.", "N'oublie pas de reporter la dizaine."],
    },
    solution: {
      answer: "45",
      feedbackCorrect: "Oui ! 27 + 18 = 45.",
      feedbackWrong: "Pense à additionner séparément dizaines et unités.",
    },
    difficulty: 1,
    skillCode: "NC-ADD-INT",
  },
  {
    id: "ex2",
    type: "NUMERIC",
    prompt: "Calcule 84 - 37",
    data: {
      tolerance: 0,
      hints: ["Aligne les unités.", "Tu peux emprunter une dizaine."],
    },
    solution: {
      value: 47,
      feedbackCorrect: "Exact, 84 - 37 = 47.",
      feedbackWrong: "Revérifie ton emprunt.",
    },
    difficulty: 1,
    skillCode: "NC-SUB-INT",
  },
  {
    id: "ex3",
    type: "DRAG",
    prompt: "Associe chaque fraction à son écriture décimale.",
    data: {
      pairs: [
        { left: "1/2", right: "0,5" },
        { left: "3/4", right: "0,75" },
        { left: "1/4", right: "0,25" },
      ],
      hints: ["Divise le numérateur par le dénominateur."],
    },
    solution: {
      matches: [
        ["1/2", "0,5"],
        ["3/4", "0,75"],
        ["1/4", "0,25"],
      ],
      feedbackCorrect: "Bravo pour les correspondances !",
      feedbackWrong: "Revois la conversion fraction → décimal.",
    },
    difficulty: 2,
    skillCode: "NC-FRAC-INTRO",
  },
];

export default function PracticePage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-widest text-primary/80">Entraînement</p>
        <h1 className="text-3xl font-bold text-slate-800">Session pratique</h1>
      </header>
      <ExerciseRunner initialExercises={exercises} />
    </div>
  );
}
