import { Button } from "@/components/ui/button";

export default function ClassLandingPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">Mode classe</h1>
        <p className="text-sm text-slate-500">Les enseignants peuvent créer des classes et suivre la progression des élèves.</p>
      </header>
      <section className="rounded-3xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold">Créer une classe</h2>
        <p className="text-sm text-slate-500">Invitez vos élèves avec un code unique et visualisez leur progression moyenne.</p>
        <Button className="mt-4">Nouvelle classe</Button>
      </section>
    </div>
  );
}
