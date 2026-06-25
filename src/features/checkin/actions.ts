"use server";

import { checkinService } from "./services/checkinService";

export async function scanTicketAction(code: string) {
  try {
    const result = await checkinService.scan(code);
    return { success: true, data: result };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Scan failed",
    };
  }
}
