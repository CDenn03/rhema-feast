import type { Order, OrderItem } from "./types";

const MOCK_ORDER_ITEMS: Record<string, OrderItem[]> = {
  "ord_001": [
    { id: "oi_001", name: "General Admission Ticket", unitPrice: 1500, quantity: 2 },
    { id: "oi_002", name: "Program Booklet", unitPrice: 500, quantity: 1 },
  ],
  "ord_002": [
    { id: "oi_003", name: "VIP Pass", unitPrice: 5000, quantity: 1 },
  ],
  "ord_003": [
    { id: "oi_004", name: "General Admission Ticket", unitPrice: 1500, quantity: 3 },
  ],
  "ord_004": [
    { id: "oi_005", name: "Event T-Shirt", unitPrice: 1200, quantity: 2 },
    { id: "oi_006", name: "Early Bird Ticket", unitPrice: 800, quantity: 1 },
  ],
  "ord_005": [
    { id: "oi_007", name: "Group Ticket (10+)", unitPrice: 1000, quantity: 10 },
  ],
};

export const MOCK_ORDERS: Order[] = [
  { id: "ord_001", eventId: "evt_001", participantId: "p_001", status: "CONFIRMED", totalAmount: 3500, currency: "KES", items: MOCK_ORDER_ITEMS["ord_001"], createdAt: "2026-07-01T10:00:00Z" },
  { id: "ord_002", eventId: "evt_001", participantId: "p_002", status: "CONFIRMED", totalAmount: 5000, currency: "KES", items: MOCK_ORDER_ITEMS["ord_002"], createdAt: "2026-07-02T14:30:00Z" },
  { id: "ord_003", eventId: "evt_001", participantId: "p_003", status: "PENDING", totalAmount: 4500, currency: "KES", items: MOCK_ORDER_ITEMS["ord_003"], createdAt: "2026-08-01T09:00:00Z" },
  { id: "ord_004", eventId: "evt_001", participantId: "p_004", status: "CONFIRMED", totalAmount: 3200, currency: "KES", items: MOCK_ORDER_ITEMS["ord_004"], createdAt: "2026-07-15T11:20:00Z" },
  { id: "ord_005", eventId: "evt_001", participantId: "p_005", status: "CANCELLED", totalAmount: 10000, currency: "KES", items: MOCK_ORDER_ITEMS["ord_005"], createdAt: "2026-07-20T16:45:00Z" },
  { id: "ord_006", eventId: "evt_001", participantId: "p_006", status: "REFUNDED", totalAmount: 1500, currency: "KES", items: MOCK_ORDER_ITEMS["ord_001"], createdAt: "2026-07-05T08:30:00Z" },
  { id: "ord_007", eventId: "evt_002", participantId: "p_007", status: "CONFIRMED", totalAmount: 2000, currency: "KES", items: [{ id: "oi_008", name: "Standard Admission", unitPrice: 2000, quantity: 1 }], createdAt: "2026-08-10T12:00:00Z" },
];

export function getMockOrders(eventId?: string): Order[] {
  if (eventId) return MOCK_ORDERS.filter((o) => o.eventId === eventId);
  return MOCK_ORDERS;
}

export function getMockOrderById(id: string): Order | undefined {
  return MOCK_ORDERS.find((o) => o.id === id);
}
