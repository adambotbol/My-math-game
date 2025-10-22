import { Lightbulb } from "lucide-react";

interface HintsProps {
  hints: string[];
}

export function Hints({ hints }: HintsProps) {
  if (!hints?.length) return null;
  return (
    <aside className="rounded-3xl bg-white/70 p-4 text-sm text-slate-600 shadow">
      <div className="mb-2 flex items-center gap-2 font-semibold text-primary">
        <Lightbulb className="h-4 w-4" aria-hidden /> Indices
      </div>
      <ul className="list-disc space-y-1 pl-5">
        {hints.map((hint) => (
          <li key={hint}>{hint}</li>
        ))}
      </ul>
    </aside>
  );
}
