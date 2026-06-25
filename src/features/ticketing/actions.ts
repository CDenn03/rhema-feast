"use server";

import { revalidatePath } from "next/cache";

export async function createTicketTypeAction(eventId: string, data: unknown) {
  // TODO: implement
  revalidatePath(`/events/${eventId}/ticketing`);
  return { success: true };
}
