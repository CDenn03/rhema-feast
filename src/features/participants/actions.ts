"use server";

import { revalidatePath } from "next/cache";
import { participantService } from "./services/participantService";
import type { CreateParticipantDto } from "./types";

export async function addParticipantAction(
  eventId: string,
  data: CreateParticipantDto
) {
  try {
    const participant = await participantService.create(eventId, data);
    revalidatePath(`/events/${eventId}/participants`);
    return { success: true, data: participant };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add participant",
    };
  }
}
