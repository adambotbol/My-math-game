import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/components/ui/utils";

interface UnitMapNode {
  slug: string;
  title: string;
  description: string;
  progress: number;
  unlocked: boolean;
  lessons: number;
}

interface UnitMapProps {
  units: UnitMapNode[];
}

export function UnitMap({ units }: UnitMapProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2">
      {units.map((unit, index) => (
        <Link
          key={unit.slug}
          href={unit.unlocked ? `/(app)/units/${unit.slug}` : "#"}
          aria-disabled={!unit.unlocked}
          className={cn(
            "group relative flex flex-col rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-md transition",
            unit.unlocked ? "hover:-translate-y-1 hover:shadow-xl" : "cursor-not-allowed opacity-60",
          )}
        >
          <div className="absolute -top-5 left-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs shadow-lg">
            <GraduationCap className="h-4 w-4" aria-hidden />
            Unité {index + 1}
          </div>
          <div className="mt-4 space-y-3">
            <h3 className="text-xl font-semibold text-slate-900">{unit.title}</h3>
            <p className="text-sm text-slate-500">{unit.description}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{unit.lessons} leçons</p>
            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                <span>Progression</span>
                <span>{unit.progress}%</span>
              </div>
              <Progress value={unit.progress} />
            </div>
          </div>
          {!unit.unlocked && (
            <span className="mt-4 inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">🔒
              Terminer l'unité précédente
            </span>
          )}
        </Link>
      ))}
    </section>
  );
}
