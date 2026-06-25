import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { POSProduct } from "../types";

export const posService = {
  getProducts: () =>
    apiClient.get<POSProduct[]>(ENDPOINTS.pos.products),

  placeOrder: (items: { productId: string; quantity: number }[]) =>
    apiClient.post(ENDPOINTS.pos.order, { items }),
};
