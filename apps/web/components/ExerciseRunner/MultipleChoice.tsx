"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MultipleChoiceProps {
  options: string[];
  onSubmit: (payload: { answer: string }) => void;
  disabled?: boolean;
}

export function MultipleChoice({ options, onSubmit, disabled }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!selected) return;
        onSubmit({ answer: selected });
      }}
      className="flex flex-col gap-3"
    >
      <div role="radiogroup" className="grid gap-3">
        {options.map((option, index) => {
          const isSelected = selected === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              disabled={disabled}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                isSelected ? "border-primary bg-primary/10 text-primary" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
              }`}
              aria-pressed={isSelected}
            >
              <span>
                <span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">
                  {index + 1}
                </span>
                {option}
              </span>
            </button>
          );
        })}
      </div>
      <Button type="submit" disabled={!selected || disabled} className="self-end">
        Valider
      </Button>
    </form>
  );
}
