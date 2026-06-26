import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getEventById, getSubEventById } from "@/features/events/queries";
import { getMockSubEventMetrics } from "@/features/reports/mock";
import { getZonesBySubEvent } from "@/features/zones/queries";
import {
  CalendarDays, MapPin, Users, Clock, BarChart3, Ticket,
  Music, UserCheck, Grid3x3, DollarSign, ArrowLeft,
} from "lucide-react";

interface Props {
  params: Promise<{ eventId: string; subEventId: string }>;
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function formatDate(start: Date, end: Date) {
  const fmt: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" };
  const s = start.toLocaleDateString("en-US", fmt);
  if (start.toDateString() !== end.toDateString()) {
    return `${s} – ${end.toLocaleDateString("en-US", { ...fmt, year: "numeric" })}`;
  }
  return `${s}, ${end.toLocaleDateString("en-US", { year: "numeric" })}`;
}

const SUB_EVENT_TYPE_LABEL: Record<string, string> = {
  "main": "Main Event",
  "kids": "Kids",
  "business-summit": "Business Summit",
  "custom": "Custom",
};

const STATUS_BADGE: Record<string, string> = {
  DRAFT: "bg-muted text-muted-foreground",
  PUBLISHED: "bg-accent-gold/15 text-accent-gold",
  ONGOING: "bg-green-500/15 text-green-600",
  COMPLETED: "bg-muted text-muted-foreground",
  CANCELLED: "bg-destructive/10 text-destructive",
};

export default async function SubEventProfilePage({ params }: Props) {
  const { eventId, subEventId } = await params;
  const [edition, subEvent] = await Promise.all([
    getEventById(eventId),
    getSubEventById(subEventId),
  ]);

  if (!edition || !subEvent) notFound();

  const metrics = getMockSubEventMetrics(subEventId);
  const zones = await getZonesBySubEvent(subEventId);
  const start = new Date(subEvent.startDate);
  const end = new Date(subEvent.endDate);
  const dateStr = formatDate(start, end);
  const agenda = subEvent.agenda ?? [];

  return (
    <div className="space-y-8">
      <PageHeader
        title={subEvent.title}
        description={`${SUB_EVENT_TYPE_LABEL[subEvent.type] ?? subEvent.type} · Part of ${edition.title}`}
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Events", href: "/admin/events" },
          { label: edition.seriesTitle, href: `/admin/events/${edition.seriesId}` },
          { label: edition.title, href: `/events/${edition.id}` },
          { label: subEvent.title },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* Left column */}
        <div className="space-y-8">
          {/* Hero */}
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-blue to-[#0C0B1B] p-8 md:p-12">
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  {SUB_EVENT_TYPE_LABEL[subEvent.type] ?? subEvent.type}
                </span>
                <span className={`inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${STATUS_BADGE[subEvent.status] ?? ""}`}>
                  {subEvent.status}
                </span>
              </div>
              <h1 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">
                {subEvent.title}
              </h1>
              <p className="mt-2 text-base text-white/70">{subEvent.description}</p>
              {subEvent.isPaid && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent-gold/20 px-4 py-2 text-accent-gold">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-semibold">KES {subEvent.price.toLocaleString()}</span>
                  <span className="text-white/60">· Ticket required</span>
                </div>
              )}
              {!subEvent.isPaid && subEvent.requiresTicket && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-500/20 px-4 py-2 text-blue-300">
                  <Ticket className="h-4 w-4" />
                  <span className="font-semibold">Free</span>
                  <span className="text-white/60">· Ticket required for entry</span>
                </div>
              )}
              {!subEvent.isPaid && !subEvent.requiresTicket && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-white/80">
                  <Ticket className="h-4 w-4" />
                  <span className="font-semibold">Free entry</span>
                  <span className="text-white/60">· Open to all, no ticket needed</span>
                </div>
              )}
            </div>
          </div>

          {/* Schedule */}
          <SectionSurface>
            <h2 className="mb-4 text-xl font-bold tracking-tight">Schedule</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <CalendarDays className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">{dateStr}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">
                    {formatTime(start)} – {formatTime(end)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Venue</p>
                  <p className="text-sm text-muted-foreground">{subEvent.venue}</p>
                </div>
              </div>
            </div>
          </SectionSurface>

          {/* Program / Agenda */}
          {agenda.length > 0 && (
            <SectionSurface>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight">
                <Music className="h-5 w-5 text-accent-gold" />
                Program
              </h2>
              <div className="divide-y rounded-2xl border">
                {agenda.map((session, idx) => (
                  <div key={session.id} className="flex gap-4 p-5">
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10">
                        <Music className="h-5 w-5 text-accent-gold" />
                      </div>
                      {idx < agenda.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
                    </div>
                    <div className="min-w-0 flex-1 pb-4">
                      <p className="font-semibold">{session.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{session.description}</p>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTime(new Date(session.startTime))} – {formatTime(new Date(session.endTime))}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <UserCheck className="h-3 w-3" />
                          {session.speaker}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {session.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionSurface>
          )}

          {/* Zones */}
          {zones.length > 0 && (
            <SectionSurface>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight">
                <Grid3x3 className="h-5 w-5 text-accent-gold" />
                Zones & Capacity
              </h2>
              <div className="space-y-3">
                {zones.map((zone) => {
                  const pct = zone.capacity > 0 ? Math.round((zone.currentCount / zone.capacity) * 100) : 0;
                  return (
                    <div key={zone.id} className="rounded-2xl border bg-card p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{zone.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {zone.currentCount}/{zone.capacity}
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min(pct, 100)}%`,
                            backgroundColor: zone.color ?? "var(--accent-gold)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionSurface>
          )}
        </div>

        {/* Right column — Stats & Actions */}
        <div className="space-y-8">
          {/* Key metrics */}
          <SectionSurface>
            <h2 className="mb-4 text-xl font-bold tracking-tight">Event Stats</h2>
            <div className="space-y-3">
              <StatCard
                icon={<BarChart3 className="h-5 w-5" />}
                label="Capacity"
                value={subEvent.capacity.toLocaleString()}
              />
              <StatCard
                icon={<CalendarDays className="h-5 w-5" />}
                label="Duration"
                value={`${Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1} days`}
              />
              <StatCard
                icon={<Music className="h-5 w-5" />}
                label="Agenda Sessions"
                value={agenda.length.toString()}
              />
              <StatCard
                icon={<Users className="h-5 w-5" />}
                label="Registrations"
                value={metrics.totalRegistrations.toLocaleString()}
              />
              <StatCard
                icon={<UserCheck className="h-5 w-5" />}
                label="Checked In"
                value={metrics.checkedIn.toLocaleString()}
              />
              <StatCard
                icon={<Grid3x3 className="h-5 w-5" />}
                label="Capacity Used"
                value={`${metrics.capacityUsed} / ${subEvent.capacity}`}
              />
              {subEvent.isPaid && (
                <StatCard
                  icon={<DollarSign className="h-5 w-5" />}
                  label="Revenue"
                  value={`KES ${metrics.revenue.toLocaleString()}`}
                />
              )}
              {subEvent.isPaid && (
                <StatCard
                  icon={<Ticket className="h-5 w-5" />}
                  label="Tickets Sold"
                  value={metrics.ticketsSold.toLocaleString()}
                />
              )}
              {!subEvent.isPaid && subEvent.requiresTicket && (
                <div className="rounded-2xl border border-dashed bg-blue-500/5 p-4 text-center">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Free — ticket required</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Tickets used for capacity management</p>
                </div>
              )}
              {!subEvent.isPaid && !subEvent.requiresTicket && (
                <div className="rounded-2xl border border-dashed bg-muted/30 p-4 text-center">
                  <p className="text-sm font-medium text-muted-foreground">Free event — no ticketing</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">Open to all attendees</p>
                </div>
              )}
            </div>
          </SectionSurface>

          {/* Registration CTA */}
          <SectionSurface>
            <h2 className="mb-4 text-xl font-bold tracking-tight">Registration</h2>
            {subEvent.isPaid ? (
              <div className="space-y-3">
                <div className="rounded-2xl bg-accent-gold/5 p-4 text-center">
                  <p className="text-2xl font-bold text-accent-gold">KES {subEvent.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">per person · ticket required</p>
                </div>
                <Link
                  href={`/events/${eventId}/register?sub=${subEventId}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-gold px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-accent-gold/90 hover:shadow-md"
                >
                  <Ticket className="h-4 w-4" />
                  Buy Ticket
                </Link>
              </div>
            ) : subEvent.requiresTicket ? (
              <div className="space-y-3">
                <div className="rounded-2xl bg-blue-500/5 p-4 text-center">
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">Free — Ticket Required</p>
                  <p className="text-xs text-muted-foreground mt-1">Reserve your free ticket for capacity management</p>
                </div>
                <Link
                  href={`/events/${eventId}/register?sub=${subEventId}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-gold px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-accent-gold/90 hover:shadow-md"
                >
                  <Ticket className="h-4 w-4" />
                  Get Free Ticket
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-2xl bg-green-500/5 p-4 text-center">
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">Free Entry</p>
                  <p className="text-xs text-muted-foreground mt-1">Open to all — no ticket needed</p>
                </div>
                <Link
                  href={`/events/${eventId}/register`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border bg-card px-6 py-3.5 text-base font-semibold transition-all hover:bg-muted"
                >
                  Register Interest
                </Link>
              </div>
            )}
          </SectionSurface>

          {/* Quick links */}
          <SectionSurface>
            <h2 className="mb-4 text-xl font-bold tracking-tight">Management</h2>
            <div className="space-y-2">
              <Link
                href={`/events/${eventId}/guests`}
                className="flex items-center gap-3 rounded-2xl border bg-card p-4 transition-all hover:shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10">
                  <Users className="h-5 w-5 text-accent-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Guests</p>
                  <p className="text-xs text-muted-foreground">Manage invitations</p>
                </div>
              </Link>
              <Link
                href={`/events/${eventId}/check-in`}
                className="flex items-center gap-3 rounded-2xl border bg-card p-4 transition-all hover:shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10">
                  <UserCheck className="h-5 w-5 text-accent-gold" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Check-in</p>
                  <p className="text-xs text-muted-foreground">Scan & verify</p>
                </div>
              </Link>
              <Link
                href={`/events/${eventId}`}
                className="flex items-center gap-3 rounded-2xl border bg-card p-4 transition-all hover:shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Back to Edition</p>
                  <p className="text-xs text-muted-foreground">{edition.title}</p>
                </div>
              </Link>
            </div>
          </SectionSurface>
        </div>
      </div>
    </div>
  );
}
