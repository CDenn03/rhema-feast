export interface EventMetrics {
  eventId: string;
  totalRegistrations: number;
  checkedIn: number;
  revenue: number;
  ticketsSold: number;
}

export interface SubEventMetrics {
  subEventId: string;
  editionId: string;
  totalRegistrations: number;
  checkedIn: number;
  capacityUsed: number;
  revenue: number;
  ticketsSold: number;
}
