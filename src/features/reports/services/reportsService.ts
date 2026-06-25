import { apiClient } from "@/lib/api/client";

export const reportsService = {
  eventMetrics: (eventId: string) =>
    apiClient.get<unknown>(`/api/reports/events/${eventId}/metrics`),
};
