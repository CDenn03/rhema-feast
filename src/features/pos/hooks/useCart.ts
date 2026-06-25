export function useCart() {
  return { items: [], total: 0, addItem: (_: unknown) => {}, removeItem: (_: string) => {} };
}
