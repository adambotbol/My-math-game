"use client";

import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface XPChipProps {
  xp: number;
  level: number;
}

export function XPChip({ xp, level }: XPChipProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary"
      aria-label={`Niveau ${level}, ${xp} points d'expérience`}
    >
      <Trophy className="h-4 w-4" aria-hidden />
      <span>Niv. {level}</span>
      <span className="text-primary/70">{xp} XP</span>
    </motion.div>
  );
}
