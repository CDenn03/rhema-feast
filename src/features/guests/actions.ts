"use server";

import { revalidatePath } from "next/cache";
import { sendGuestInviteEmail, sendGuestConfirmationEmail } from "@/lib/mail";
import { getEventById } from "@/features/events/queries";
import { config } from "@/lib/config";
import { MOCK_GUEST_INVITES, MOCK_GUEST_CATEGORIES } from "./mock";
import type { GuestInvite, GuestConfirmation, GuestCompanion } from "./types";

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function generateId(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

export async function createGuestInviteAction(formData: FormData) {
  const eventId = formData.get("eventId") as string;
  const title = formData.get("title") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const organization = formData.get("organization") as string;
  const categoryId = formData.get("categoryId") as string;
  const zoneId = formData.get("zoneId") as string;
  const maxPlusOnes = Number(formData.get("maxPlusOnes")) || 0;

  if (!eventId || !name || !email) {
    return { success: false, error: "Name, email, and event are required." };
  }

  const event = await getEventById(eventId);
  if (!event) {
    return { success: false, error: "Event not found." };
  }

  const token = generateToken();
  const inviteId = generateId("gi");

  const category = MOCK_GUEST_CATEGORIES.find((c) => c.id === categoryId);

  const invite: GuestInvite = {
    id: inviteId,
    eventId,
    guestCategoryId: categoryId,
    title,
    name,
    email,
    phone,
    organization,
    defaultPlusOneCount: maxPlusOnes,
    maxPlusOnes,
    zoneId,
    seatId: null,
    status: "pending",
    inviteSentAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    token,
    createdBy: "admin",
    category: category
      ? { id: category.id, name: category.name, description: category.description, isActive: category.isActive, color: category.color }
      : undefined,
  };

  MOCK_GUEST_INVITES.push(invite);

  const rsvpUrl = `${config.appUrl}/guest/confirm/${token}`;

  const eventDate = event.startDate
    ? new Date(event.startDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "TBA";

  const eventTime = event.startDate
    ? new Date(event.startDate).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "TBA";

  const categoryName = category?.name ?? ((formData.get("categoryName") as string) || "Special Guest");

  try {
    await sendGuestInviteEmail({
      to: { name, email },
      eventName: event.title,
      eventDate,
      eventTime,
      venue: event.venue ?? "TBA",
      guestName: name,
      guestTitle: title,
      guestCategory: categoryName,
      maxCompanions: maxPlusOnes,
      rsvpUrl,
    });
  } catch (error) {
    console.error("Failed to send invite email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send invite email.",
    };
  }

  revalidatePath(`/events/${eventId}/guests`);

  return {
    success: true,
    data: invite,
  };
}

export async function respondToInviteAction(formData: FormData) {
  const token = formData.get("token") as string;
  const response = formData.get("response") as "accept" | "decline";
  const companionNamesStr = (formData.get("companionNames") as string) || "[]";

  if (!token || !response) {
    return { success: false, error: "Missing token or response." };
  }

  const invite = MOCK_GUEST_INVITES.find((i) => i.token === token);
  if (!invite) {
    return { success: false, error: "Invitation not found." };
  }

  if (invite.status !== "pending") {
    return { success: false, error: `This invitation has already been ${invite.status}.` };
  }

  let companionNames: string[] = [];
  try {
    companionNames = JSON.parse(companionNamesStr);
  } catch {
    companionNames = [];
  }

  const validCompanions = companionNames.filter(Boolean);
  const isAttending = response === "accept";

  const confirmation: GuestConfirmation = {
    id: generateId("gcf"),
    guestInviteId: invite.id,
    respondedAt: new Date().toISOString(),
    isAttending,
    companionCount: validCompanions.length,
    notes: "",
  };

  const companions: GuestCompanion[] = validCompanions.map((name, i) => ({
    id: generateId("gc"),
    guestInviteId: invite.id,
    name,
    seatId: null,
    addedToAttendeeList: false,
  }));

  invite.status = isAttending ? "confirmed" : "declined";
  invite.confirmation = confirmation;
  invite.companions = companions;

  if (isAttending) {
    try {
      const event = await getEventById(invite.eventId);

      const eventDate = event?.startDate
        ? new Date(event.startDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "TBA";

      const eventTime = event?.startDate
        ? new Date(event.startDate).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })
        : "TBA";

      const category = MOCK_GUEST_CATEGORIES.find((c) => c.id === invite.guestCategoryId);

      await sendGuestConfirmationEmail({
        to: { name: invite.name, email: invite.email },
        eventName: event?.title ?? "Event",
        eventDate,
        eventTime,
        venue: event?.venue ?? "TBA",
        guestName: invite.name,
        guestTitle: invite.title,
        guestCategory: category?.name ?? "Special Guest",
        companionNames: validCompanions,
      });
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
    }
  }

  revalidatePath(`/events/${invite.eventId}/guests`);

  return {
    success: true,
    data: {
      token,
      response,
      companionCount: validCompanions.length,
    },
  };
}

export async function resendInviteAction(inviteId: string) {
  return { success: false, error: "Not implemented yet." };
}
