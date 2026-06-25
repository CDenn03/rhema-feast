import type { Role, Permission } from "@/config/permissions";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  SUPER_USER: ["*"],
  ADMIN: [
    "events:read",
    "events:write",
    "participants:read",
    "participants:write",
    "ticketing:read",
    "ticketing:write",
    "checkin:read",
    "checkin:write",
    "orders:read",
    "payments:read",
    "reports:read",
    "communications:write",
  ],
  STAFF: [
    "events:read",
    "participants:read",
    "checkin:read",
    "checkin:write",
    "orders:read",
  ],
  VIEWER: ["events:read", "reports:read"],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  const perms = ROLE_PERMISSIONS[role] ?? [];
  return perms.includes("*") || perms.includes(permission);
}
