import type { EventMetrics } from "./types";

export const MOCK_EVENT_METRICS: Record<string, EventMetrics> = {
  "evt_001": {
    eventId: "evt_001",
    totalRegistrations: 1500,
    checkedIn: 980,
    revenue: 2450000,
    ticketsSold: 1250,
  },
  "evt_002": {
    eventId: "evt_002",
    totalRegistrations: 320,
    checkedIn: 280,
    revenue: 640000,
    ticketsSold: 310,
  },
};

export function getMockEventMetrics(eventId: string): EventMetrics {
  return MOCK_EVENT_METRICS[eventId] ?? { eventId, totalRegistrations: 0, checkedIn: 0, revenue: 0, ticketsSold: 0 };
}
