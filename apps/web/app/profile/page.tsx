import { ProgressBar } from "@/components/ProgressBar";
import { XPChip } from "@/components/XPChip";

export default function ProfilePage() {
  const stats = {
    xp: 1280,
    level: 6,
    badges: [
      { code: "FIRST_LESSON", title: "Première leçon" },
      { code: "STREAK_3", title: "Flamme 3 jours" },
    ],
    masteryByDomain: [
      { domain: "Nombres & calculs", mastery: 55 },
      { domain: "Grandeurs & mesures", mastery: 30 },
      { domain: "Espace & géométrie", mastery: 20 },
    ],
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Ton profil</h1>
          <p className="text-sm text-slate-500">Suis tes progrès et collectionne les badges.</p>
        </div>
        <XPChip xp={stats.xp} level={stats.level} />
      </header>
      <section className="rounded-3xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-slate-700">Maîtrise par domaine</h2>
        <div className="mt-4 space-y-4">
          {stats.masteryByDomain.map((item) => (
            <ProgressBar key={item.domain} value={item.mastery} label={item.domain} />
          ))}
        </div>
      </section>
      <section className="rounded-3xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-slate-700">Badges obtenus</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {stats.badges.map((badge) => (
            <div key={badge.code} className="flex h-24 w-24 flex-col items-center justify-center rounded-3xl bg-primary/10 text-center text-xs font-semibold text-primary">
              🏅
              <span className="mt-1">{badge.title}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
