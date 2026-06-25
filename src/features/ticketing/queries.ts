import { ticketingService } from "./services/ticketingService";

export async function getTicketTypes(eventId: string) {
  return ticketingService.listTypes(eventId);
}
