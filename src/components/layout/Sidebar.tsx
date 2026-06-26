"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  ShoppingCart,
  ShoppingBag,
  Shirt,
  Settings,
  Users,
  Ticket,
  QrCode,
  Grid3x3,
  Handshake,
  Truck,
  MessageSquare,
  CreditCard,
  BarChart3,
  UserPlus,
  ChevronRight,
  LogOut,
  ScanLine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/features/auth/actions";
import { useEventsStore } from "@/store/eventsStore";

const iconMap: Record<string, React.ReactNode> = {
  Dashboard: <LayoutDashboard className="h-4 w-4" />,
  Events: <Calendar className="h-4 w-4" />,
  POS: <ShoppingCart className="h-4 w-4" />,
  Orders: <ShoppingBag className="h-4 w-4" />,
  Merch: <Shirt className="h-4 w-4" />,
  "Admin Settings": <Settings className="h-4 w-4" />,
  Attendees: <Users className="h-4 w-4" />,
  Ticketing: <Ticket className="h-4 w-4" />,
  "Check-in": <QrCode className="h-4 w-4" />,
  Zones: <Grid3x3 className="h-4 w-4" />,
  Partners: <Handshake className="h-4 w-4" />,
  Vendors: <Truck className="h-4 w-4" />,
  Communications: <MessageSquare className="h-4 w-4" />,
  Payments: <CreditCard className="h-4 w-4" />,
  Reports: <BarChart3 className="h-4 w-4" />,
  Guests: <UserPlus className="h-4 w-4" />,
  "Entry Logs": <ScanLine className="h-4 w-4" />,
};

const GLOBAL_ITEMS = [
  { label: "Dashboard", href: "/admin", iconKey: "Dashboard" },
  { label: "Events", href: "/admin/events", iconKey: "Events" },
  { label: "Partners", href: "/admin/partners", iconKey: "Partners" },
  { label: "Merch", href: "/admin/merch/inventory", iconKey: "Merch" },
  // { label: "Settings", href: "/admin/settings", iconKey: "Admin Settings" },
];

const STAFF_ITEMS = [
  { label: "POS", href: "/admin/pos", iconKey: "POS" },
  { label: "Check-in", href: "/admin/checkin", iconKey: "Check-in" },
];

const EVENT_ITEMS = [
  { label: "Guests", key: "guests", iconKey: "Guests" },
  { label: "Attendees", key: "participants", iconKey: "Attendees" },
  { label: "Ticketing", key: "ticketing", iconKey: "Ticketing" },
  { label: "Check-in", key: "check-in", iconKey: "Check-in" },
  { label: "Zones", key: "zones", iconKey: "Zones" },
  { label: "Partners", key: "partners", iconKey: "Partners" },
  { label: "Vendors", key: "vendors", iconKey: "Vendors" },
  { label: "Orders", key: "orders", iconKey: "Orders" },
  { label: "Payments", key: "payments", iconKey: "Payments" },
  { label: "Communications", key: "communications", iconKey: "Communications" },
  { label: "Entry Logs", key: "entries", iconKey: "Entry Logs" },
  { label: "Reports", key: "reports", iconKey: "Reports" },
];

function NavItem({
  href,
  label,
  icon,
  isActive,
}: Readonly<{
  href: string;
  label: string;
  icon?: React.ReactNode;
  isActive: boolean;
}>) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
        "active:scale-[0.98]",

        isActive
          ? [
              "border border-sidebar-primary/25",
              "bg-sidebar-primary/12",
              "text-sidebar-primary",
              "font-semibold",
              "shadow-[0_0_0_1px_rgba(214,177,132,0.12),0_4px_12px_rgba(214,177,132,0.08)]",
            ]
          : [
              "text-sidebar-foreground/75",
              "hover:bg-sidebar-accent",
              "hover:text-sidebar-foreground",
              "active:bg-sidebar-accent/80",
            ]
      )}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-sidebar-primary" />
      )}

      {icon && (
        <span
          className={cn(
            "shrink-0 transition-colors",
            isActive
              ? "text-sidebar-primary"
              : "text-sidebar-foreground/60 group-hover:text-sidebar-foreground"
          )}
        >
          {icon}
        </span>
      )}

      <span className="flex-1 truncate">{label}</span>

      <ChevronRight
        className={cn(
          "h-3.5 w-3.5 transition-all duration-200",
          isActive
            ? "opacity-100 text-sidebar-primary"
            : "opacity-0 text-sidebar-foreground/50 group-hover:opacity-100"
        )}
      />
    </Link>
  );
}

function EventSubNav() {
  const pathname = usePathname();
  const match = new RegExp(/^\/events\/([^/]+)/).exec(pathname);
  const eventId = match?.[1];

  if (!eventId) {
    return (
      <div className="rounded-xl border border-dashed border-sidebar-border px-4 py-6 text-center">
        <p className="text-xs text-sidebar-foreground/60">
          Select an event to access per-event modules
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      {EVENT_ITEMS.map((item) => {
        const href = `/events/${eventId}/${item.key}` as const;
        const isActive = pathname.startsWith(href);
        return (
          <NavItem
            key={item.key}
            href={href}
            label={item.label}
            icon={iconMap[item.iconKey]}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
}

function SectionLabel({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sidebar-primary/65">
        {children}
      </p>
    </div>
  );
}

function EventList() {
  const pathname = usePathname();
  const { series, editions, loaded, fetchEvents } = useEventsStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (series.length === 0) return null;

  return (
    <div className="space-y-3">
      <SectionLabel>My Series</SectionLabel>
      {series.map((ser) => {
        const seriesHref = `/admin/events/${ser.id}`;
        const isSeriesActive = pathname === seriesHref || pathname.startsWith(seriesHref + "/");
        const seriesEditions = editions.filter((e) => e.seriesId === ser.id);

        return (
          <div key={ser.id} className="space-y-0.5">
            <NavItem
              href={seriesHref}
              label={ser.title}
              icon={iconMap.Events}
              isActive={isSeriesActive && seriesEditions.length === 0}
            />
            {seriesEditions.length > 0 && (
              <div className="ml-3 space-y-0.5 border-l border-sidebar-border/50 pl-2">
                {seriesEditions.map((ed) => {
                  const href = `/events/${ed.id}`;
                  const isActive = pathname === href || pathname.startsWith(href + "/");
                  return (
                    <Link
                      key={ed.id}
                      href={href}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                        "active:scale-[0.98]",
                        isActive
                          ? "text-sidebar-primary font-semibold"
                          : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground active:bg-sidebar-accent/80"
                      )}
                    >
                      <span className="text-[10px] font-medium uppercase tracking-wider text-sidebar-foreground/40">
                        {ed.year}
                      </span>
                      <span className="flex-1 truncate">{ed.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        flex
        h-full
        w-[290px]
        shrink-0
        flex-col
        border-r
        border-sidebar-border
        bg-sidebar
        text-sidebar-foreground
      "
    >
      <Link
        href="/admin"
        className="flex h-20 w-full items-center gap-3 border-b border-sidebar-border px-6"
      >
        <Image
          src="/rf-logo.png"
          alt="RF Logo"
          width={100}
          height={100}
          className="rounded-xl"
        />
      </Link>

      <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-5">
        <div className="space-y-2">
          <SectionLabel>Admin</SectionLabel>
          <div className="space-y-0.5">
            {GLOBAL_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={iconMap[item.iconKey]}
                  isActive={isActive}
                />
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <SectionLabel>Staff</SectionLabel>
          <div className="space-y-0.5">
            {STAFF_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");
              return (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={iconMap[item.iconKey]}
                  isActive={isActive}
                />
              );
            })}
          </div>
        </div>

        <EventList />

        <div className="space-y-2">
          <SectionLabel>Per Event</SectionLabel>
          <EventSubNav />
        </div>
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <form action={logoutAction}>
          <button
            type="submit"
            className="
              group
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-3
              py-2.5
              text-sm
              text-sidebar-foreground/75
              transition-all
              duration-200
              hover:bg-sidebar-accent
              hover:text-sidebar-foreground
              active:scale-[0.98]
              active:bg-sidebar-accent/80
            "
          >
            <LogOut className="h-4 w-4 shrink-0" />

            <span className="flex-1 text-left">
              Sign out
            </span>

            <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100" />
          </button>
        </form>
      </div>
    </aside>
  );
}
