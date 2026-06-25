export type TicketStatus = "AVAILABLE" | "SOLD_OUT" | "RESERVED" | "WAITLIST";

export interface TicketType {
  id: string;
  eventId: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  capacity: number;
  sold: number;
  status: TicketStatus;
}

export interface Ticket {
  id: string;
  ticketTypeId: string;
  participantId: string;
  code: string;
  status: "ACTIVE" | "USED" | "CANCELLED" | "REFUNDED";
  purchasedAt: string;
}
