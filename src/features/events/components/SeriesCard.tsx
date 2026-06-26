import type { EventSeries } from "../types";
import { CalendarDays, Layers, ArrowRight, Repeat2, Calendar } from "lucide-react";
import Link from "next/link";

const RECURRENCE_LABEL: Record<string, string> = {
  annual: "Annual",
  weekly: "Weekly",
  adhoc: "Ad-hoc",
};

const RECURRENCE_ICON: Record<string, React.ReactNode> = {
  annual: <Calendar className="h-4 w-4" />,
  weekly: <Repeat2 className="h-4 w-4" />,
  adhoc: <CalendarDays className="h-4 w-4" />,
};

interface Props {
  series: EventSeries;
}

export function SeriesCard({ series }: Props) {
  return (
    <div className="group overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:shadow-lg">
      <Link href={`/admin/events/${series.id}`}>
        <div className="relative flex h-36 items-end bg-gradient-to-br from-brand-blue to-[#0C0B1B] p-6">
          <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
            {RECURRENCE_ICON[series.recurrence]}
            {RECURRENCE_LABEL[series.recurrence]}
          </div>
        </div>
      </Link>
      <div className="space-y-4 p-6">
        <Link href={`/admin/events/${series.id}`}>
          <h3 className="text-xl font-bold leading-snug tracking-tight transition-colors group-hover:text-accent-gold">
            {series.title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {series.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="h-4 w-4" />
              {series.editionCount} {series.editionCount === 1 ? "edition" : "editions"}
            </span>
            {series.latestEdition && (
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {series.latestEdition.year}
              </span>
            )}
          </div>
          <Link
            href={`/admin/events/${series.id}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent-gold transition-colors hover:text-accent-gold/80"
          >
            View
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
