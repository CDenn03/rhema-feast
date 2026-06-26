import type { EventStatus } from "@/config/event";

export type SeriesRecurrence = "annual" | "weekly" | "adhoc";

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

export interface EventSeries {
  id: string;
  title: string;
  slug: string;
  description: string;
  heroImage?: string;
  recurrence: SeriesRecurrence;
  createdAt: string;
  updatedAt: string;
  editionCount: number;
  latestEdition?: EventEdition;
}

export interface EventEdition {
  id: string;
  seriesId: string;
  seriesTitle: string;
  year: string;
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
  subEvents?: SubEvent[];
}

export interface SubEvent {
  id: string;
  editionId: string;
  type: SubEventType;
  title: string;
  slug: string;
  description: string;
  capacity: number;
  price: number;
  isPaid: boolean;
  requiresTicket: boolean;
  startDate: string;
  endDate: string;
  venue: string;
  status: EventStatus;
  ticketTypeId?: string;
  agenda?: AgendaSession[];
  partners?: EventPartner[];
}

export type SubEventType = "main" | "kids" | "business-summit" | "custom";

// Existing Event type kept as alias for backward compatibility
export type Event = EventEdition;

export interface CreateEventDto {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  capacity: number;
}

export type UpdateEventDto = Partial<CreateEventDto>;

export interface CreateSeriesDto {
  title: string;
  slug: string;
  description: string;
  recurrence: SeriesRecurrence;
}

export interface CreateEditionDto {
  seriesId: string;
  year: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  capacity: number;
}

export interface CreateSubEventDto {
  editionId: string;
  type: SubEventType;
  title: string;
  slug: string;
  description: string;
  capacity: number;
  price: number;
  isPaid: boolean;
  requiresTicket: boolean;
  startDate: string;
  endDate: string;
  venue: string;
}
