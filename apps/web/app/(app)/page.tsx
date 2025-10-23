import { UnitMap } from "@/components/UnitMap";
import { StreakFlame } from "@/components/StreakFlame";
import { XPChip } from "@/components/XPChip";
import { LessonCard } from "@/components/LessonCard";
import { ProgressBar } from "@/components/ProgressBar";

const dashboardData = {
  username: "Mathlete",
  xp: 1280,
  level: 6,
  streak: { current: 5, best: 12 },
  todayGoal: 70,
  units: [
    {
      slug: "nombres-et-calculs",
      title: "Nombres & calculs",
      description: "Addition, soustraction, multiplication et premières fractions.",
      progress: 45,
      unlocked: true,
      lessons: 3,
    },
    {
      slug: "grandeurs-mesures",
      title: "Grandeurs & mesures",
      description: "Unités, conversions et calculs d'aires simples.",
      progress: 0,
      unlocked: false,
      lessons: 2,
    },
  ],
  spotlightLessons: [
    {
      href: "/(app)/units/nombres-et-calculs/lesson/operations-simples",
      title: "Calcul mental éclair",
      description: "Entraîne-toi aux additions et soustractions rapides.",
      progress: 60,
      locked: false,
      skillCodes: ["NC-ADD-INT", "NC-SUB-INT"],
    },
    {
      href: "/(app)/units/nombres-et-calculs/lesson/fractions",
      title: "Fractions de base",
      description: "Comprends le sens d'une fraction simple.",
      progress: 20,
      locked: false,
      skillCodes: ["NC-FRAC-INTRO"],
    },
  ],
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-primary/90 via-primary to-accent/90 p-8 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Salut, {dashboardData.username} 👋</h1>
            <p className="text-sm text-white/80">Continue ta série pour débloquer de nouveaux badges !</p>
          </div>
          <StreakFlame current={dashboardData.streak.current} best={dashboardData.streak.best} />
          <XPChip xp={dashboardData.xp} level={dashboardData.level} />
        </div>
        <ProgressBar value={dashboardData.todayGoal} label="Objectif du jour" />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">Unité en cours</h2>
        </div>
        <UnitMap units={dashboardData.units} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">Leçons recommandées</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {dashboardData.spotlightLessons.map((lesson) => (
            <LessonCard key={lesson.href} {...lesson} />
          ))}
        </div>
      </section>
    </div>
  );
}
