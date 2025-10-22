"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DragDropProps {
  pairs: { left: string; right: string }[];
  onSubmit: (payload: { matches: [string, string][] }) => void;
  disabled?: boolean;
}

interface PairState {
  left: string;
  right?: string;
}

export function DragDrop({ pairs, onSubmit, disabled }: DragDropProps) {
  const [matches, setMatches] = useState<PairState[]>(pairs.map((pair) => ({ left: pair.left })));
  const [selected, setSelected] = useState<string | null>(null);

  const rights = pairs.map((pair) => pair.right);

  const toggle = (value: string) => {
    if (selected) {
      setMatches((prev) => prev.map((match) => (match.left === selected ? { ...match, right: value } : match)));
      setSelected(null);
    } else {
      setSelected(value);
    }
  };

  const isComplete = matches.every((match) => match.right);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!isComplete) return;
        onSubmit({ matches: matches.map((match) => [match.left, match.right!]) });
      }}
      className="flex flex-col gap-4"
    >
      <div className="grid gap-2">
        {matches.map((match) => (
          <div key={match.left} className="flex items-center justify-between rounded-2xl bg-white p-3 text-sm shadow">
            <span className="font-semibold text-slate-600">{match.left}</span>
            <span className="text-slate-400">→</span>
            <span className="text-slate-500">{match.right ?? "?"}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {rights.map((right) => (
          <button
            key={right}
            type="button"
            onClick={() => toggle(right)}
            disabled={disabled}
            className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
              selected === right ? "border-primary bg-primary/10 text-primary" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
            }`}
          >
            {right}
          </button>
        ))}
      </div>
      <Button type="submit" disabled={!isComplete || disabled} className="self-end">
        Valider
      </Button>
    </form>
  );
}
