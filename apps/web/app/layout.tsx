import "./globals.css";
import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { cn } from "@/components/ui/utils";

const font = Quicksand({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "MathQuest 6e",
  description: "Une aventure mathématique gamifiée pour les collégiens.",
  metadataBase: new URL("https://adambotbol.github.io/My-math-game"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className={cn("min-h-screen bg-slate-50 text-slate-900", font.className)}>
        {children}
      </body>
    </html>
  );
}
