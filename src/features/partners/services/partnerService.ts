import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Partner } from "../types";

export const partnerService = {
  list: () => apiClient.get<Partner[]>(ENDPOINTS.partners.list),
  detail: (id: string) => apiClient.get<Partner>(ENDPOINTS.partners.detail(id)),
  create: (data: Partial<Partner>) =>
    apiClient.post<Partner>(ENDPOINTS.partners.list, data),
};
