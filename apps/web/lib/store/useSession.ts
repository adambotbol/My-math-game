"use client";

import { create } from "zustand";

interface SessionState {
  userId?: string;
  username?: string;
  role?: "student" | "teacher";
  xp: number;
  gems: number;
  setSession: (payload: Partial<SessionState>) => void;
  clear: () => void;
}

export const useSession = create<SessionState>((set) => ({
  userId: undefined,
  username: undefined,
  role: "student",
  xp: 0,
  gems: 0,
  setSession: (payload) => set((state) => ({ ...state, ...payload })),
  clear: () => set({ userId: undefined, username: undefined, role: "student", xp: 0, gems: 0 }),
}));
