import { create } from "zustand";
import type { ScanResult } from "../types";

interface ScanQueueItem {
  code: string;
  timestamp: string;
  synced: boolean;
}

interface ScanStore {
  lastResult: ScanResult | null;
  queue: ScanQueueItem[];
  setLastResult: (result: ScanResult) => void;
  addToQueue: (code: string) => void;
  markSynced: (code: string) => void;
  clearQueue: () => void;
}

export const useScanStore = create<ScanStore>((set) => ({
  lastResult: null,
  queue: [],
  setLastResult: (result) => set({ lastResult: result }),
  addToQueue: (code) =>
    set((state) => ({
      queue: [
        ...state.queue,
        { code, timestamp: new Date().toISOString(), synced: false },
      ],
    })),
  markSynced: (code) =>
    set((state) => ({
      queue: state.queue.map((item) =>
        item.code === code ? { ...item, synced: true } : item
      ),
    })),
  clearQueue: () => set({ queue: [] }),
}));
