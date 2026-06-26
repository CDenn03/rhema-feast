import type { EventMetrics, SubEventMetrics } from "./types";

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

export const MOCK_SUB_EVENT_METRICS: Record<string, SubEventMetrics> = {
  "sub_001": {
    subEventId: "sub_001",
    editionId: "evt_001",
    totalRegistrations: 1200,
    checkedIn: 800,
    capacityUsed: 1800,
    revenue: 0,
    ticketsSold: 0,
  },
  "sub_002": {
    subEventId: "sub_002",
    editionId: "evt_001",
    totalRegistrations: 85,
    checkedIn: 65,
    capacityUsed: 85,
    revenue: 0,
    ticketsSold: 0,
  },
  "sub_003": {
    subEventId: "sub_003",
    editionId: "evt_001",
    totalRegistrations: 320,
    checkedIn: 280,
    capacityUsed: 320,
    revenue: 640000,
    ticketsSold: 310,
  },
};

export function getMockEventMetrics(eventId: string): EventMetrics {
  return MOCK_EVENT_METRICS[eventId] ?? { eventId, totalRegistrations: 0, checkedIn: 0, revenue: 0, ticketsSold: 0 };
}

export function getMockSubEventMetrics(subEventId: string): SubEventMetrics {
  return MOCK_SUB_EVENT_METRICS[subEventId] ?? { subEventId, editionId: "", totalRegistrations: 0, checkedIn: 0, capacityUsed: 0, revenue: 0, ticketsSold: 0 };
}
