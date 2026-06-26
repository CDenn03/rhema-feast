import { create } from "zustand";

interface SidebarSeries {
  id: string;
  title: string;
  recurrence: string;
}

interface SidebarEdition {
  id: string;
  title: string;
  seriesId: string;
  year: string;
}

interface EventsState {
  series: SidebarSeries[];
  editions: SidebarEdition[];
  loaded: boolean;
  fetchEvents: () => Promise<void>;
  invalidate: () => void;
}

export const useEventsStore = create<EventsState>((set, get) => ({
  series: [],
  editions: [],
  loaded: false,
  fetchEvents: async () => {
    if (get().loaded) return;
    try {
      const [seriesRes, editionsRes] = await Promise.all([
        fetch("/api/internal/events/series"),
        fetch("/api/internal/events"),
      ]);
      const seriesData = await seriesRes.json();
      const editionsData = await editionsRes.json();
      set({
        series: seriesData.data ?? [],
        editions: editionsData.data ?? [],
        loaded: true,
      });
    } catch {
      set({ loaded: true });
    }
  },
  invalidate: () => set({ loaded: false, series: [], editions: [] }),
}));
