import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Zone } from "../types";

export const zoneService = {
  list: (eventId: string) => apiClient.get<Zone[]>(ENDPOINTS.zones.list(eventId)),
};
