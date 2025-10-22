import { UnitMap } from "@/components/UnitMap";

const mockUnits = [
  {
    slug: "nombres-et-calculs",
    title: "Nombres & calculs",
    description: "Les bases des opérations et des fractions.",
    progress: 45,
    unlocked: true,
    lessons: 3,
  },
  {
    slug: "grandeurs-mesures",
    title: "Grandeurs & mesures",
    description: "Mesurer, convertir et comparer.",
    progress: 10,
    unlocked: true,
    lessons: 2,
  },
  {
    slug: "espace-geometrie",
    title: "Espace & géométrie",
    description: "Figures, symétries et solides.",
    progress: 0,
    unlocked: false,
    lessons: 4,
  },
];

export default function UnitsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">Carte des unités</h1>
        <p className="text-sm text-slate-500">Progresse pas à pas et débloque de nouvelles zones du royaume MathQuest.</p>
      </header>
      <UnitMap units={mockUnits} />
    </div>
  );
}
