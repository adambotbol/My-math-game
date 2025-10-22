import { motion } from "framer-motion";

interface QuestionStemProps {
  prompt: string;
}

export function QuestionStem({ prompt }: QuestionStemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl bg-white/80 p-6 text-lg font-semibold leading-relaxed text-slate-800 shadow"
    >
      {prompt}
    </motion.div>
  );
}
