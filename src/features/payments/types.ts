export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
export type PaymentProvider = "MPESA" | "CARD" | "CASH";

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: PaymentProvider;
  reference?: string;
  createdAt: string;
}

export interface InitiatePaymentDto {
  orderId: string;
  amount: number;
  provider: PaymentProvider;
  phone?: string; // for Mpesa
}
