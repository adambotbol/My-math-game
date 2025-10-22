import { notFound } from "next/navigation";
import { LessonCard } from "@/components/LessonCard";

const mockUnits: Record<string, { title: string; description: string; lessons: any[] }> = {
  "nombres-et-calculs": {
    title: "Nombres & calculs",
    description: "Objectifs : consolider les opérations et manipuler les fractions.",
    lessons: [
      {
        href: "/(app)/units/nombres-et-calculs/lesson/operations-simples",
        title: "Opérations simples",
        description: "Addition et soustraction d'entiers.",
        progress: 60,
        locked: false,
        skillCodes: ["NC-ADD-INT", "NC-SUB-INT"],
      },
      {
        href: "/(app)/units/nombres-et-calculs/lesson/multiplications",
        title: "Multiplications rapides",
        description: "Tables et astuces mentales.",
        progress: 30,
        locked: false,
        skillCodes: ["NC-MULT-BASE"],
      },
      {
        href: "/(app)/units/nombres-et-calculs/lesson/fractions",
        title: "Fractions",
        description: "Lire et comparer des fractions.",
        progress: 0,
        locked: false,
        skillCodes: ["NC-FRAC-INTRO"],
      },
    ],
  },
};

export default function UnitDetailPage({ params }: { params: { unitSlug: string } }) {
  const unit = mockUnits[params.unitSlug];
  if (!unit) notFound();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">{unit.title}</h1>
        <p className="text-sm text-slate-500">{unit.description}</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {unit.lessons.map((lesson) => (
          <LessonCard key={lesson.href} {...lesson} />
        ))}
      </div>
    </div>
  );
}
