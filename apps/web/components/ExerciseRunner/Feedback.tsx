import { CheckCircle2, XCircle } from "lucide-react";

interface FeedbackProps {
  correct: boolean;
  explanation?: string;
}

export function Feedback({ correct, explanation }: FeedbackProps) {
  return (
    <div
      role="alert"
      className={`rounded-3xl px-5 py-4 text-sm font-semibold shadow ${
        correct ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
      }`}
    >
      <div className="flex items-center gap-2">
        {correct ? <CheckCircle2 className="h-5 w-5" aria-hidden /> : <XCircle className="h-5 w-5" aria-hidden />}
        {correct ? "Bravo !" : "Essaie encore"}
      </div>
      {explanation && <p className="mt-2 text-xs font-normal text-slate-600">{explanation}</p>}
    </div>
  );
}
