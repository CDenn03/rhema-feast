import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { MerchItem } from "../types";

export const merchService = {
  list: () => apiClient.get<MerchItem[]>(ENDPOINTS.merch.inventory),
};
