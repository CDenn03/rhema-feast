"use server";

import { posService } from "./services/posService";

export async function placePOSOrderAction(
  items: { productId: string; quantity: number }[]
) {
  try {
    const order = await posService.placeOrder(items);
    return { success: true, data: order };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Order failed",
    };
  }
}
