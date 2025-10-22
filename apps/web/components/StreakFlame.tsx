"use client";

import { Flame } from "lucide-react";
import { motion } from "framer-motion";

interface StreakFlameProps {
  current: number;
  best: number;
  compact?: boolean;
}

export function StreakFlame({ current, best, compact = false }: StreakFlameProps) {
  return (
    <div className="flex items-center gap-2" aria-label={`Série actuelle ${current} jours, record ${best}`}>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="relative"
      >
        <Flame className="h-7 w-7 text-orange-400 drop-shadow-[0_0_10px_rgba(255,159,104,0.75)]" aria-hidden />
        <span className="absolute inset-0 animate-ping rounded-full bg-orange-200/40" />
      </motion.div>
      <div className={`flex flex-col ${compact ? "text-xs" : "text-sm"}`}>
        <span className="font-bold text-orange-500">{current} 🔥</span>
        {!compact && <span className="text-slate-400">Record : {best}</span>}
      </div>
    </div>
  );
}
