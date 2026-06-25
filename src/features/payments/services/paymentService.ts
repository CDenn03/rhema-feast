import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Payment, InitiatePaymentDto } from "../types";

export const paymentService = {
  list: () =>
    apiClient.get<Payment[]>(ENDPOINTS.payments.list),

  initiate: (data: InitiatePaymentDto) =>
    apiClient.post<Payment>(ENDPOINTS.payments.initiate, data),
};
