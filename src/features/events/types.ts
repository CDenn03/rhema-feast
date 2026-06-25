import type { EventStatus } from "@/config/event";

export interface AgendaSession {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  speaker: string;
  location: string;
}

export interface EventPartner {
  id: string;
  name: string;
  type: "SPONSOR" | "MEDIA" | "VENDOR";
  logo?: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: EventStatus;
  startDate: string;
  endDate: string;
  venue: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
  guestInvitesEnabled?: boolean;
  defaultPlusOneCount?: number;
  inviteExpiryHours?: number;
  agenda?: AgendaSession[];
  partners?: EventPartner[];
}

export interface CreateEventDto {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  capacity: number;
}

export type UpdateEventDto = Partial<CreateEventDto>;
