export type Role = "SUPER_USER" | "ADMIN" | "STAFF" | "VIEWER";

export type Permission =
  | "*"
  | "events:read"
  | "events:write"
  | "participants:read"
  | "participants:write"
  | "ticketing:read"
  | "ticketing:write"
  | "checkin:read"
  | "checkin:write"
  | "orders:read"
  | "payments:read"
  | "reports:read"
  | "communications:write"
  | "admin:read"
  | "admin:write";
