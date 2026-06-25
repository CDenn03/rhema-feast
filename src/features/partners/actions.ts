"use server";
import { revalidatePath } from "next/cache";
import { partnerService } from "./services/partnerService";
import type { Partner } from "./types";

export async function createPartnerAction(data: Partial<Partner>) {
  try {
    const partner = await partnerService.create(data);
    revalidatePath("/partners");
    return { success: true, data: partner };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Failed" };
  }
}
