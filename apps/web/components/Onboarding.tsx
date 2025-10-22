"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const avatars = [
  { id: "pythagou", label: "Pythagou" },
  { id: "gauss", label: "Mini-Gauss" },
  { id: "sophie", label: "Sophie" },
];

const goals = [5, 10, 15];

const onboardingSchema = z.object({
  avatar: z.string(),
  goal: z.number(),
});

type OnboardingForm = z.infer<typeof onboardingSchema>;

export function Onboarding({ onComplete }: { onComplete: (values: OnboardingForm) => void }) {
  const form = useForm<OnboardingForm>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { avatar: avatars[0].id, goal: 10 },
  });
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="mx-auto max-w-xl space-y-8 rounded-3xl bg-white/90 p-8 shadow-xl"
      onSubmit={form.handleSubmit(async (values) => {
        setSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 600));
        onComplete(values);
        setSubmitting(false);
      })}
    >
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-slate-800">Bienvenue dans MathQuest ✨</h1>
        <p className="text-sm text-slate-500">Choisis ton avatar compagnon et ton objectif quotidien.</p>
      </header>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">Ton compagnon</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {avatars.map((avatar) => {
            const isSelected = form.watch("avatar") === avatar.id;
            return (
              <button
                key={avatar.id}
                type="button"
                onClick={() => form.setValue("avatar", avatar.id)}
                className={`flex flex-col items-center gap-2 rounded-3xl border-2 px-4 py-6 text-sm font-semibold transition ${
                  isSelected ? "border-primary bg-primary/10 text-primary" : "border-transparent bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span className="text-4xl" role="img" aria-hidden>
                  {avatar.id === "pythagou" ? "🦉" : avatar.id === "gauss" ? "🧠" : "🧮"}
                </span>
                {avatar.label}
              </button>
            );
          })}
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">Ton objectif quotidien</h2>
        <div className="flex flex-wrap gap-3">
          {goals.map((goal) => {
            const isSelected = form.watch("goal") === goal;
            return (
              <button
                key={goal}
                type="button"
                onClick={() => form.setValue("goal", goal)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
                  isSelected ? "bg-primary text-white shadow" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {goal} min / jour
              </button>
            );
          })}
        </div>
      </section>
      <Button type="submit" className="w-full rounded-full" disabled={submitting}>
        {submitting ? "Chargement..." : "Je pars à l'aventure"}
      </Button>
    </form>
  );
}
