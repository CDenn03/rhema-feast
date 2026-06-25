export function useOfflineSync() {
  return { isSyncing: false, sync: async () => {} };
}
