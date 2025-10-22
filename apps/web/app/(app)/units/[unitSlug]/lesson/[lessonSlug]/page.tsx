import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

const lessons: Record<string, { title: string; description: string; objectives: string[]; practiceHref: string }> = {
  "operations-simples": {
    title: "Opérations simples",
    description: "Addition et soustraction d'entiers dans la tête.",
    objectives: [
      "Additionner des entiers jusqu'à 1 000",
      "Soustraire avec retenue",
      "Utiliser des décompositions astucieuses",
    ],
    practiceHref: "/(app)/units/nombres-et-calculs/lesson/operations-simples/practice",
  },
  fractions: {
    title: "Fractions de base",
    description: "Comprendre le sens d'une fraction et la représenter.",
    objectives: ["Identifier numérateur et dénominateur", "Placer une fraction sur une droite graduée"],
    practiceHref: "/(app)/units/nombres-et-calculs/lesson/fractions/practice",
  },
};

export default function LessonPage({ params }: { params: { unitSlug: string; lessonSlug: string } }) {
  const lesson = lessons[params.lessonSlug];
  if (!lesson) notFound();
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-widest text-primary/80">Unité : {params.unitSlug.replace(/-/g, " ")}</p>
        <h1 className="text-3xl font-bold text-slate-800">{lesson.title}</h1>
        <p className="text-sm text-slate-500">{lesson.description}</p>
      </header>
      <section className="rounded-3xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-slate-700">Objectifs</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
          {lesson.objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </section>
      <div className="flex justify-end">
        <Button size="lg" className="rounded-full" asChild>
          <Link href={lesson.practiceHref}>Commencer la pratique</Link>
        </Button>
      </div>
    </div>
  );
}
