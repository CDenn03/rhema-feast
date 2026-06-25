import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Order } from "../types";
import type { PaginatedResult, PaginationParams } from "@/types";

export const orderService = {
  list: (params?: PaginationParams) =>
    apiClient.get<PaginatedResult<Order>>(ENDPOINTS.orders.list, { params }),

  detail: (id: string) =>
    apiClient.get<Order>(ENDPOINTS.orders.detail(id)),
};
