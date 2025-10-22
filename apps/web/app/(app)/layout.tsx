import type { ReactNode } from "react";
import { TopNav } from "@/components/layout/TopNav";
import { Sidebar } from "@/components/layout/Sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <main className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-4 py-8">
        <Sidebar />
        <section className="flex-1 space-y-6">{children}</section>
      </main>
    </div>
  );
}
