import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  value: number;
  label?: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      {label && <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>}
      <div className="flex items-center gap-3">
        <Progress value={value} className="h-4 flex-1" />
        <span className="text-sm font-semibold text-slate-500">{value}%</span>
      </div>
    </div>
  );
}
