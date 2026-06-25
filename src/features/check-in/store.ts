import { create } from "zustand";
import type { CheckInEntry, CheckInStore } from "./types";

const STORAGE_KEY = "event-platform-checkins";

function loadEntries(): CheckInEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: CheckInEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

const initialEntries = typeof window !== "undefined" ? loadEntries() : [];

export const useCheckInStore = create<CheckInStore>((set, get) => ({
  entries: initialEntries,

  checkIn: (entry) => {
    const newEntry: CheckInEntry = {
      ...entry,
      id: `cin_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      checkInTime: new Date().toISOString(),
      checkedInBy: "user_admin",
    };
    const updated = [...get().entries, newEntry];
    set({ entries: updated });
    saveEntries(updated);
  },

  undoCheckIn: (id) => {
    const updated = get().entries.filter((e) => e.id !== id);
    set({ entries: updated });
    saveEntries(updated);
  },

  isCheckedIn: (sourceType, sourceId) => {
    return get().entries.some((e) => e.sourceType === sourceType && e.sourceId === sourceId);
  },
}));
