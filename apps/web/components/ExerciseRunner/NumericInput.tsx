"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumericInputProps {
  onSubmit: (payload: { value: number }) => void;
  disabled?: boolean;
  tolerance?: number;
}

export function NumericInput({ onSubmit, disabled, tolerance }: NumericInputProps) {
  const [value, setValue] = useState<string>("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!value) return;
        onSubmit({ value: Number(value) });
      }}
      className="flex flex-col gap-3"
    >
      <Input
        inputMode="decimal"
        pattern="[0-9.,]*"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={disabled}
        placeholder="Ta réponse"
        aria-describedby={tolerance ? "numeric-help" : undefined}
      />
      {tolerance && (
        <p id="numeric-help" className="text-xs text-slate-500">
          Tolérance ±{tolerance}
        </p>
      )}
      <Button type="submit" disabled={!value || disabled} className="self-end">
        Valider
      </Button>
    </form>
  );
}
