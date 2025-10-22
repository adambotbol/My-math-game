"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenCheck, Compass, Gauge, GraduationCap } from "lucide-react";

const sidebarLinks = [
  { href: "/(app)", label: "Tableau de bord", icon: Gauge },
  { href: "/(app)/units", label: "Carte des unités", icon: Compass },
  { href: "/(app)/class", label: "Mes classes", icon: GraduationCap },
  { href: "/(app)/profile", label: "Progression", icon: BookOpenCheck },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-4 rounded-3xl bg-white/90 p-6 shadow-inner md:flex">
      <p className="text-sm font-semibold uppercase tracking-widest text-slate-400">Navigation</p>
      <nav className="flex flex-col gap-3">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
