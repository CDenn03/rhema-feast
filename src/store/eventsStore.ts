import { create } from "zustand";

interface SidebarEvent {
  id: string;
  title: string;
}

interface EventsState {
  events: SidebarEvent[];
  loaded: boolean;
  fetchEvents: () => Promise<void>;
  invalidate: () => void;
}

export const useEventsStore = create<EventsState>((set, get) => ({
  events: [],
  loaded: false,
  fetchEvents: async () => {
    if (get().loaded) return;
    try {
      const res = await fetch("/api/internal/events");
      const data = await res.json();
      set({ events: data.data ?? [], loaded: true });
    } catch {
      set({ loaded: true });
    }
  },
  invalidate: () => set({ loaded: false, events: [] }),
}));
