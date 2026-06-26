import type { EventEdition } from "../types";
import { CalendarDays, MapPin, Users, ArrowRight, Layers } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const STATUS_HEADER: Record<string, string> = {
  DRAFT: "bg-muted-foreground/30",
  PUBLISHED: "bg-accent-gold",
  ONGOING: "bg-accent-gold",
  COMPLETED: "bg-muted-foreground/30",
  CANCELLED: "bg-muted-foreground/20",
};

const STATUS_BADGE: Record<string, string> = {
  DRAFT: "bg-muted text-muted-foreground",
  PUBLISHED: "bg-accent-gold/15 text-accent-gold",
  ONGOING: "bg-accent-gold/15 text-accent-gold",
  COMPLETED: "bg-muted text-muted-foreground",
  CANCELLED: "bg-muted text-muted-foreground",
};

interface Props {
  edition: EventEdition;
}

export function EditionCard({ edition }: Props) {
  const start = new Date(edition.startDate);
  const end = new Date(edition.endDate);
  const dateStr =
    start.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
    (start.toDateString() !== end.toDateString()
      ? ` – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
      : `, ${end.toLocaleDateString("en-US", { year: "numeric" })}`);

  const subEventCount = edition.subEvents?.length ?? 0;

  return (
    <div className="group overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:shadow-lg">
      <Link href={`/events/${edition.id}`}>
        <div className={cn("relative flex h-32 items-end p-5", STATUS_HEADER[edition.status] ?? "bg-muted-foreground/30")}>
          <span className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            <CalendarDays className="h-3 w-3" />
            {edition.year}
          </span>
        </div>
      </Link>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/events/${edition.id}`}>
            <h3 className="text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-accent-gold">
              {edition.title}
            </h3>
          </Link>
          <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider", STATUS_BADGE[edition.status] ?? "bg-muted text-muted-foreground")}>
            {edition.status}
          </span>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{edition.venue}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Users className="h-4 w-4 shrink-0" />
            <span>Capacity: {edition.capacity.toLocaleString()}</span>
          </div>
          {subEventCount > 0 && (
            <div className="flex items-center gap-2.5">
              <Layers className="h-4 w-4 shrink-0" />
              <span>{subEventCount} sub-event{subEventCount !== 1 ? "s" : ""}</span>
            </div>
          )}
        </div>
        <Link
          href={`/events/${edition.id}`}
          className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent-gold px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-gold/90"
        >
          Manage
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
