import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface LessonCardProps {
  href: string;
  title: string;
  description: string;
  progress: number;
  locked?: boolean;
  skillCodes: string[];
}

export function LessonCard({ href, title, description, progress, locked = false, skillCodes }: LessonCardProps) {
  return (
    <Card className={`relative flex h-full flex-col ${locked ? "opacity-60" : ""}`} aria-disabled={locked}>
      {locked && (
        <span className="absolute right-6 top-6 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-500">
          🔒 À débloquer
        </span>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-sm text-slate-500">{description}</p>
      </CardHeader>
      <CardContent className="mt-auto space-y-4">
        <div className="flex flex-wrap gap-2">
          {skillCodes.map((code) => (
            <Badge key={code} className="bg-primary/5 text-primary">
              {code}
            </Badge>
          ))}
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-400">
            <span>Progression</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
        <Link
          href={locked ? "#" : href}
          aria-disabled={locked}
          className={`flex items-center justify-between rounded-2xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition ${
            locked ? "pointer-events-none" : "hover:bg-primary/20"
          }`}
        >
          Commencer
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </CardContent>
    </Card>
  );
}
