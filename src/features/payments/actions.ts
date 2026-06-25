"use server";

import { paymentService } from "./services/paymentService";
import type { InitiatePaymentDto } from "./types";

export async function initiatePaymentAction(data: InitiatePaymentDto) {
  try {
    const payment = await paymentService.initiate(data);
    return { success: true, data: payment };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Payment initiation failed",
    };
  }
}
