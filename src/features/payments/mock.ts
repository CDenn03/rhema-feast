import type { Payment } from "./types";

export const MOCK_PAYMENTS: Payment[] = [
  { id: "pay_001", orderId: "ord_001", amount: 3500, currency: "KES", status: "COMPLETED", provider: "MPESA", reference: "MPE-7A3F2B", createdAt: "2026-07-01T10:05:00Z" },
  { id: "pay_002", orderId: "ord_002", amount: 5000, currency: "KES", status: "COMPLETED", provider: "CARD", reference: "CRD-91D4E8", createdAt: "2026-07-02T14:35:00Z" },
  { id: "pay_003", orderId: "ord_003", amount: 4500, currency: "KES", status: "PENDING", provider: "MPESA", reference: "MPE-52B7C1", createdAt: "2026-08-01T09:05:00Z" },
  { id: "pay_004", orderId: "ord_004", amount: 3200, currency: "KES", status: "COMPLETED", provider: "CASH", reference: null, createdAt: "2026-07-15T11:25:00Z" },
  { id: "pay_005", orderId: "ord_005", amount: 10000, currency: "KES", status: "REFUNDED", provider: "MPESA", reference: "MPE-64C9D0", createdAt: "2026-07-20T16:50:00Z" },
  { id: "pay_006", orderId: "ord_006", amount: 1500, currency: "KES", status: "REFUNDED", provider: "CARD", reference: "CRD-38E2F7", createdAt: "2026-07-05T08:35:00Z" },
  { id: "pay_007", orderId: "ord_007", amount: 2000, currency: "KES", status: "COMPLETED", provider: "MPESA", reference: "MPE-11A4B9", createdAt: "2026-08-10T12:05:00Z" },
  { id: "pay_008", orderId: "ord_008", amount: 800, currency: "KES", status: "FAILED", provider: "CARD", reference: "CRD-77H3J5", createdAt: "2026-08-12T14:00:00Z" },
];

export function getMockPayments(): Payment[] {
  return MOCK_PAYMENTS;
}

export function getMockPaymentsForEvent(eventId: string): Payment[] {
  const orderIds = ["ord_001", "ord_002", "ord_003", "ord_004", "ord_005", "ord_006"].filter((oid) => {
    const { MOCK_ORDERS } = require("@/features/orders/mock");
    const order = MOCK_ORDERS.find((o: { id: string }) => o.id === oid);
    return order?.eventId === eventId;
  });
  return MOCK_PAYMENTS.filter((p) => orderIds.includes(p.orderId));
}
