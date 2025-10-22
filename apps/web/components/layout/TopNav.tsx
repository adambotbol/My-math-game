"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gem, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StreakFlame } from "@/components/StreakFlame";
import { XPChip } from "@/components/XPChip";

const navItems = [
  { href: "/(app)", label: "Accueil" },
  { href: "/(app)/units", label: "Carte" },
  { href: "/(app)/profile", label: "Profil" },
  { href: "/(app)/settings", label: "Réglages" },
];

export function TopNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/(app)" className="flex items-center gap-2 text-lg font-bold text-primary">
          <span role="img" aria-label="Mascotte">
            🧠
          </span>
          MathQuest 6e
        </Link>
        <nav className="hidden items-center gap-4 text-sm font-medium md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 transition ${isActive ? "bg-primary/10 text-primary" : "text-slate-500 hover:text-slate-900"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <StreakFlame current={5} best={12} compact />
          <XPChip xp={1280} level={6} />
          <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 md:flex">
            <Gem className="h-4 w-4 text-accent" aria-hidden />
            42
          </div>
          <Avatar className="hidden md:flex">
            <AvatarImage alt="Pythagou" src="/mascot/pythagou-avatar.svg" />
            <AvatarFallback>P6</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon" aria-label="Se déconnecter">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
