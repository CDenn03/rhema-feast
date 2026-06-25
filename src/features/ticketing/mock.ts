import type { TicketType, Ticket } from "./types";

export const MOCK_TICKET_TYPES: TicketType[] = [
  { id: "tt_001", eventId: "evt_001", name: "General Admission", description: "Standard entry to all sessions", price: 1500, currency: "KES", capacity: 2000, sold: 1450, status: "AVAILABLE" },
  { id: "tt_002", eventId: "evt_001", name: "VIP Pass", description: "Premium seating with exclusive lounge access", price: 5000, currency: "KES", capacity: 300, sold: 280, status: "AVAILABLE" },
  { id: "tt_003", eventId: "evt_001", name: "Early Bird", description: "Discounted early registration", price: 800, currency: "KES", capacity: 500, sold: 500, status: "SOLD_OUT" },
  { id: "tt_004", eventId: "evt_001", name: "Group (10+)", description: "Group booking for 10 or more", price: 1000, currency: "KES", capacity: 200, sold: 80, status: "AVAILABLE" },
  { id: "tt_005", eventId: "evt_002", name: "Standard", description: "Full day access", price: 2000, currency: "KES", capacity: 500, sold: 320, status: "AVAILABLE" },
];

export const MOCK_TICKETS: Ticket[] = [
  { id: "tkt_001", ticketTypeId: "tt_001", participantId: "p_001", code: "RH-24A7F", status: "ACTIVE", purchasedAt: "2026-07-01T10:00:00Z" },
  { id: "tkt_002", ticketTypeId: "tt_001", participantId: "p_002", code: "RH-39B2C", status: "ACTIVE", purchasedAt: "2026-07-02T14:30:00Z" },
  { id: "tkt_003", ticketTypeId: "tt_002", participantId: "p_003", code: "RH-81D5E", status: "ACTIVE", purchasedAt: "2026-07-03T09:15:00Z" },
  { id: "tkt_004", ticketTypeId: "tt_003", participantId: "p_004", code: "RH-62F9G", status: "ACTIVE", purchasedAt: "2026-06-15T11:00:00Z" },
  { id: "tkt_005", ticketTypeId: "tt_001", participantId: "p_005", code: "RH-14H7J", status: "USED", purchasedAt: "2026-07-05T16:45:00Z" },
  { id: "tkt_006", ticketTypeId: "tt_002", participantId: "p_006", code: "RH-55K3L", status: "ACTIVE", purchasedAt: "2026-07-10T08:30:00Z" },
  { id: "tkt_007", ticketTypeId: "tt_004", participantId: "p_007", code: "RH-98M1N", status: "ACTIVE", purchasedAt: "2026-07-12T12:00:00Z" },
  { id: "tkt_008", ticketTypeId: "tt_001", participantId: "p_008", code: "RH-33P9Q", status: "CANCELLED", purchasedAt: "2026-07-08T15:20:00Z" },
  { id: "tkt_009", ticketTypeId: "tt_003", participantId: "p_009", code: "RH-77R2S", status: "ACTIVE", purchasedAt: "2026-06-20T10:10:00Z" },
  { id: "tkt_010", ticketTypeId: "tt_002", participantId: "p_010", code: "RH-44T6U", status: "REFUNDED", purchasedAt: "2026-07-04T13:00:00Z" },
];

export function getMockTicketTypes(eventId: string): TicketType[] {
  return MOCK_TICKET_TYPES.filter((t) => t.eventId === eventId);
}

export function getMockTickets(eventId: string): Ticket[] {
  const typeIds = MOCK_TICKET_TYPES.filter((t) => t.eventId === eventId).map((t) => t.id);
  return MOCK_TICKETS.filter((t) => typeIds.includes(t.ticketTypeId));
}
