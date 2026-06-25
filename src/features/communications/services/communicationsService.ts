import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Campaign } from "../types";

export const communicationsService = {
  listCampaigns: () =>
    apiClient.get<Campaign[]>(ENDPOINTS.communications.campaigns),
};
