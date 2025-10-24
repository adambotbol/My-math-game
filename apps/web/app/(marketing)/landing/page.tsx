import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingPage() {
  return (
    <main className="mq-gradient flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center text-white">
      <div className="max-w-2xl space-y-6">
        <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-xs uppercase tracking-widest">MathQuest 6e</span>
        <h1 className="text-4xl font-bold sm:text-5xl">Fais décoller ta maîtrise des maths de 6e</h1>
        <p className="text-lg text-white/90">
          Des leçons courtes, des exercices fun et un compagnon mascotte qui te guide pas à pas. Basé sur le programme officiel, avec
          gamification façon Duolingo.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full bg-white text-primary">
            <Link href="/(app)">Commencer l'aventure</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full border-white bg-transparent text-white hover:bg-white/10">
            <Link href="/(app)/class">Mode classe</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
