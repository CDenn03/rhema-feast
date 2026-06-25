import type { EventStatus } from "@/config/event";

export const EVENT_STATUS_LABELS: Record<EventStatus, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  ONGOING: "Ongoing",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const EVENT_STATUS_COLORS: Record<EventStatus, string> = {
  DRAFT: "secondary",
  PUBLISHED: "default",
  ONGOING: "default",
  COMPLETED: "outline",
  CANCELLED: "destructive",
};
