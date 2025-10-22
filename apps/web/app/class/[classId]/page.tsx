import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";

const mockClass = {
  name: "6e B Collège Lumière",
  inviteCode: "PYTHA42",
  averageMastery: 62,
  students: [
    { name: "Emma", mastery: 78, streak: 4 },
    { name: "Noah", mastery: 55, streak: 2 },
    { name: "Lina", mastery: 68, streak: 7 },
  ],
};

export default function ClassDetailPage({ params }: { params: { classId: string } }) {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{mockClass.name}</h1>
          <p className="text-sm text-slate-500">Code d'invitation : {mockClass.inviteCode}</p>
        </div>
        <Button variant="outline">Copier le code</Button>
      </header>
      <section className="rounded-3xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-slate-700">Vue d'ensemble</h2>
        <ProgressBar value={mockClass.averageMastery} label="Maîtrise moyenne" />
      </section>
      <section className="rounded-3xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-slate-700">Élèves</h2>
        <div className="mt-4 space-y-3">
          {mockClass.students.map((student) => (
            <div key={student.name} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm">
              <span className="font-semibold text-slate-700">{student.name}</span>
              <span className="text-slate-500">Maîtrise {student.mastery}%</span>
              <span className="text-orange-500">🔥 {student.streak}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
