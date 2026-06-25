import type { Role } from "@/config/permissions";

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  permission?: string;
}

export const NAVIGATION: Record<Role, NavItem[]> = {
  SUPER_USER: [
    { label: "Dashboard", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Participants", href: "/participants" },
    { label: "Ticketing", href: "/ticketing" },
    { label: "Check-in", href: "/checkin" },
    { label: "POS", href: "/pos" },
    { label: "Orders", href: "/orders" },
    { label: "Payments", href: "/payments" },
    { label: "Partners", href: "/partners" },
    { label: "Reports", href: "/reports" },
    { label: "Admin", href: "/admin" },
  ],
  ADMIN: [
    { label: "Dashboard", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Participants", href: "/participants" },
    { label: "Ticketing", href: "/ticketing" },
    { label: "Check-in", href: "/checkin" },
    { label: "Orders", href: "/orders" },
    { label: "Payments", href: "/payments" },
    { label: "Reports", href: "/reports" },
  ],
  STAFF: [
    { label: "Dashboard", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Check-in", href: "/checkin" },
    { label: "Orders", href: "/orders" },
  ],
  VIEWER: [
    { label: "Dashboard", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Reports", href: "/reports" },
  ],
};
