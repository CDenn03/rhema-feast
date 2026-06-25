"use server";

import { revalidatePath } from "next/cache";
import { eventService } from "./services/eventService";
import type { CreateEventDto, UpdateEventDto } from "./types";

export async function createEventAction(data: CreateEventDto) {
  try {
    const event = await eventService.create(data);
    revalidatePath("/events");
    return { success: true, data: event };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create event",
    };
  }
}

export async function updateEventAction(id: string, data: UpdateEventDto) {
  try {
    const event = await eventService.update(id, data);
    revalidatePath(`/events/${id}`);
    return { success: true, data: event };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update event",
    };
  }
}

export async function deleteEventAction(id: string) {
  try {
    await eventService.delete(id);
    revalidatePath("/events");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete event",
    };
  }
}
