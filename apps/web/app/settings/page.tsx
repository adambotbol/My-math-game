"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const settingsSchema = z.object({
  dailyGoal: z.number().min(5).max(30),
  locale: z.enum(["fr", "en"]),
});

type SettingsForm = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const form = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { dailyGoal: 10, locale: "fr" },
  });
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">Réglages</h1>
        <p className="text-sm text-slate-500">Personnalise ton expérience MathQuest.</p>
      </header>
      <form
        className="space-y-6 rounded-3xl bg-white p-6 shadow"
        onSubmit={form.handleSubmit((values) => {
          console.log(values);
          setSaved(true);
        })}
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600" htmlFor="dailyGoal">
            Objectif quotidien (minutes)
          </label>
          <Input id="dailyGoal" type="number" min={5} max={30} {...form.register("dailyGoal", { valueAsNumber: true })} />
          {form.formState.errors.dailyGoal && (
            <p className="text-xs text-danger">{form.formState.errors.dailyGoal.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600" htmlFor="locale">
            Langue
          </label>
          <select
            id="locale"
            {...form.register("locale")}
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
        <Button type="submit">Enregistrer</Button>
        {saved && <p className="text-xs text-success">Préférences enregistrées ✔️</p>}
      </form>
    </div>
  );
}
