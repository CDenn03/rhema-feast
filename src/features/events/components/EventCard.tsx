import type { Event } from "../types";
import { cn } from "@/lib/utils";
import { CalendarDays, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const STATUS_STYLES: Record<string, { badge: string; header: string }> = {
  DRAFT: {
    badge: "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
    header: "bg-muted-foreground/30",
  },
  PUBLISHED: {
    badge: "bg-accent-gold/15 text-accent-gold dark:text-accent-gold",
    header: "bg-accent-gold",
  },
  ONGOING: {
    badge: "bg-accent-gold/15 text-accent-gold dark:text-accent-gold",
    header: "bg-accent-gold",
  },
  COMPLETED: {
    badge: "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
    header: "bg-muted-foreground/30",
  },
  CANCELLED: {
    badge: "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
    header: "bg-muted-foreground/20",
  },
};

interface Props {
  event: Event;
  showRegister?: boolean;
}

export function EventCard({ event, showRegister }: Props) {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const dateStr =
    start.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
    (start.toDateString() !== end.toDateString()
      ? ` – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
      : `, ${end.toLocaleDateString("en-US", { year: "numeric" })}`);

  const style = STATUS_STYLES[event.status] ?? STATUS_STYLES.DRAFT;

  return (
    <div className="group overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:shadow-lg">
      <Link href={`/events/${event.id}`}>
        <div className={cn("relative flex h-44 items-end p-5", style.header)}>
          <span
            className={cn(
              "inline-block rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider shadow-sm",
              style.badge
            )}
          >
            {event.status}
          </span>
        </div>
      </Link>
      <div className="space-y-4 p-5">
        <Link href={`/events/${event.id}`}>
          <h3 className="text-lg font-bold leading-snug tracking-tight hover:text-accent-gold transition-colors">
            {event.title}
          </h3>
        </Link>
        <div className="space-y-2.5 text-sm text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <CalendarDays className="h-4 w-4 shrink-0" />
            <span>{dateStr}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Users className="h-4 w-4 shrink-0" />
            <span>Capacity: {event.capacity.toLocaleString()}</span>
          </div>
        </div>
        {showRegister && (
          <Link
            href={`/events/${event.id}/register`}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-accent-gold px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-gold/90"
          >
            Register
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
