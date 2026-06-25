export type OrderStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "REFUNDED";

export interface Order {
  id: string;
  eventId?: string;
  participantId?: string;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  items: OrderItem[];
  createdAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
}
