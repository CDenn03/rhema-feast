export function useScanQueue() {
  return { queue: [], add: (_: unknown) => {}, flush: async () => {} };
}
