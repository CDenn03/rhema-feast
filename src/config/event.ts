export const EVENT_STATUSES = {
  DRAFT: "DRAFT",
  PUBLISHED: "PUBLISHED",
  ONGOING: "ONGOING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type EventStatus = keyof typeof EVENT_STATUSES;

export const EVENT_DEFAULTS = {
  pageSize: 20,
  defaultTimezone: "Africa/Nairobi",
  currency: "KES",
};
