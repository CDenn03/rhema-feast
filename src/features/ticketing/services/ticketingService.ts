import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { TicketType, Ticket } from "../types";

export const ticketingService = {
  listTypes: (eventId: string) =>
    apiClient.get<TicketType[]>(ENDPOINTS.ticketing.list(eventId)),

  getTicket: (eventId: string, id: string) =>
    apiClient.get<Ticket>(ENDPOINTS.ticketing.detail(eventId, id)),
};
