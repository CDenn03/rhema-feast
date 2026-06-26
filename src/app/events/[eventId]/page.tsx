import { getSession } from "@/lib/auth";
import { PageHeader } from "@/components/layout/PageHeader";
import { getEventById } from "@/features/events/queries";
import { SectionSurface, ContentPanel } from "@/components/layout/Surface";
import { AttendanceTrend } from "@/features/events/components/AttendanceTrend";
import { getMockGuestInvites } from "@/features/guests/mock";
import { getMockTicketTypes, getMockTickets } from "@/features/ticketing/mock";
import { getMockOrders } from "@/features/orders/mock";
import { getMockZones } from "@/features/zones/mock";
import { getMockCampaigns } from "@/features/communications/mock";
import { getMockSubEventMetrics } from "@/features/reports/mock";
import {
  CalendarDays, MapPin, Users, Clock, BarChart3, Handshake,
  Music, UserCheck, Building2, Gift, BookOpen, Ticket,
  ShoppingBag, MessageSquare, Grid3x3, ChevronRight, ArrowRight, Layers,
} from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ eventId: string }>;
}

function HeroSection({ title, eventId, status }: { title: string; eventId: string; status: string }) {
  const colors: Record<string, string> = {
    DRAFT: "bg-muted-foreground/30",
    PUBLISHED: "bg-accent-gold",
    ONGOING: "bg-accent-gold",
    COMPLETED: "bg-muted-foreground/30",
    CANCELLED: "bg-muted-foreground/20",
  };
  const bg = colors[status] ?? "bg-muted-foreground/30";

  return (
    <div className={`relative overflow-hidden rounded-[32px] ${bg} p-8 md:p-12`}>
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative">
        <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
          {status}
        </span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">{title}</h1>
        <p className="mt-2 text-base text-white/70">Event ID: {eventId}</p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-card p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}

function formatDate(start: Date, end: Date) {
  const fmt: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" };
  const s = start.toLocaleDateString("en-US", fmt);
  if (start.toDateString() !== end.toDateString()) {
    return `${s} – ${end.toLocaleDateString("en-US", { ...fmt, year: "numeric" })}`;
  }
  return `${s}, ${end.toLocaleDateString("en-US", { year: "numeric" })}`;
}

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

async function PublicEventDetailPage({ params }: Props) {
  const { eventId } = await params;
  const event = await getEventById(eventId);

  if (!event) {
    return (
      <main className="container mx-auto py-16">
        <PageHeader title="Event Not Found" className="mb-12" />
        <p className="text-muted-foreground">This event could not be found.</p>
      </main>
    );
  }

  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const dateStr = formatDate(start, end);
  const agenda = event.agenda ?? [];
  const partners = event.partners ?? [];

  return (
    <main className="container mx-auto py-16">
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        {/* Left Column — Event Details */}
        <div className="space-y-10">
          <HeroSection title={event.title} eventId={event.id} status={event.status} />

          <section>
            <h2 className="mb-3 text-xl font-bold tracking-tight">About This Event</h2>
            <p className="leading-relaxed text-muted-foreground">{event.description}</p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold tracking-tight">Date &amp; Time</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10">
                  <CalendarDays className="h-5 w-5 text-accent-gold" />
                </div>
                <div>
                  <p className="font-medium">Date</p>
                  <p className="text-sm text-muted-foreground">{dateStr}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10">
                  <Clock className="h-5 w-5 text-accent-gold" />
                </div>
                <div>
                  <p className="font-medium">Time</p>
                  <p className="text-sm text-muted-foreground">
                    {formatTime(start)} – {formatTime(end)}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10">
                  <MapPin className="h-5 w-5 text-accent-gold" />
                </div>
                <div>
                  <p className="font-medium">Venue</p>
                  <p className="text-sm text-muted-foreground">{event.venue}</p>
                </div>
              </div>
            </div>
          </section>

          {agenda.length > 0 && (
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight">
                <BookOpen className="h-5 w-5 text-accent-gold" />
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
            </section>
          )}

          {partners.length > 0 && (
            <section>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight">
                <Handshake className="h-5 w-5 text-accent-gold" />
                Partners &amp; Sponsors
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {partners.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 rounded-2xl border bg-card p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gold/10">
                      <Building2 className="h-5 w-5 text-accent-gold" />
                    </div>
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs capitalize text-muted-foreground">{p.type.toLowerCase()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column — Sidebar */}
        <div className="space-y-8">
          <div className="rounded-3xl border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">Capacity</p>
            <p className="text-3xl font-bold text-accent-gold">{event.capacity.toLocaleString()}</p>
          </div>

          <div className="overflow-hidden rounded-3xl border bg-card">
            <div className="bg-muted p-12 text-center text-sm text-muted-foreground">
              Map Placeholder
            </div>
          </div>

          <Link
            href={`/events/${eventId}/register`}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent-gold px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-gold/90"
          >
            Register for this Event
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}

async function DashboardEventDetailPage({ params }: Props) {
  const { eventId } = await params;
  const event = await getEventById(eventId);

  if (!event) {
    return (
      <div className="space-y-6">
        <PageHeader title="Event Not Found" breadcrumbs={[{ label: "Events", href: "/events" }, { label: "Not Found" }]} />
      </div>
    );
  }

  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  const dateStr = formatDate(start, end);
  const agenda = event.agenda ?? [];
  const partners = event.partners ?? [];

  const guestInvites = getMockGuestInvites(eventId);
  const ticketTypes = getMockTicketTypes(eventId);
  const tickets = getMockTickets(eventId);
  const orders = getMockOrders(eventId);
  const zones = getMockZones(eventId);
  const campaigns = getMockCampaigns();
  return (
    <div className="space-y-8">
      <PageHeader
        title={event.title}
        description="Event overview and management"
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Events", href: "/admin/events" },
          ...(event.seriesId
            ? [{ label: event.seriesTitle, href: `/admin/events/${event.seriesId}` as const }
            ] : []),
          { label: event.title },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        {/* Left Column */}
        <div className="space-y-8">
          <HeroSection title={event.title} eventId={event.id} status={event.status} />

          {event.subEvents && event.subEvents.length > 0 && (
            <SectionSurface>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight">
                <Layers className="h-5 w-5 text-accent-gold" />
                Sub-Events
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {event.subEvents.map((sub) => {
                  const subMetrics = getMockSubEventMetrics(sub.id);
                  return (
                    <Link
                      key={sub.id}
                      href={`/events/${event.id}/subevents/${sub.id}`}
                      className="flex flex-col gap-3 rounded-2xl border bg-card p-4 transition-all hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-gold/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-gold">
                            {sub.type}
                          </span>
                          {sub.isPaid && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                              Paid
                            </span>
                          )}
                          {!sub.isPaid && sub.requiresTicket && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                              Ticket
                            </span>
                          )}
                          {!sub.isPaid && !sub.requiresTicket && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                              Open
                            </span>
                          )}
                        </div>
                        {sub.isPaid && (
                          <span className="text-sm font-semibold text-accent-gold">
                            KES {sub.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold leading-snug">{sub.title}</h3>
                      <p className="line-clamp-2 text-xs text-muted-foreground">
                        {sub.description}
                      </p>
                      <div className="mt-auto grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {new Date(sub.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {sub.capacity.toLocaleString()}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <UserCheck className="h-3 w-3" />
                          {subMetrics.checkedIn} checked in
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </SectionSurface>
          )}

          <SectionSurface>
            <h2 className="mb-4 text-xl font-bold tracking-tight">Event Summary</h2>
            <p className="leading-relaxed text-muted-foreground">{event.description}</p>
          </SectionSurface>

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
                  <p className="text-sm text-muted-foreground">{event.venue}</p>
                </div>
              </div>
            </div>
          </SectionSurface>

          {agenda.length > 0 && (
            <SectionSurface>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight">
                <BookOpen className="h-5 w-5 text-accent-gold" />
                Event Program
              </h2>
              <div className="divide-y rounded-2xl border">
                {agenda.map((session, idx) => (
                  <div key={session.id} className={`flex gap-4 p-5 ${idx === 0 ? "" : ""}`}>
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10">
                        <Music className="h-5 w-5 text-accent-gold" />
                      </div>
                      {idx < agenda.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
                    </div>
                    <div className="min-w-0 flex-1 pb-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold">{session.title}</p>
                          <p className="mt-0.5 text-sm text-muted-foreground">{session.description}</p>
                        </div>
                        <span className="shrink-0 rounded-lg bg-muted px-3 py-1 text-xs font-medium">
                          {formatTime(new Date(session.startTime))}
                        </span>
                      </div>
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

          <SectionSurface>
            <h2 className="mb-4 text-xl font-bold tracking-tight">Terms & Conditions</h2>
            <ContentPanel>
              <p className="text-sm text-muted-foreground">
                Standard event terms and conditions apply. Tickets are non-refundable unless the event is cancelled.
                The organizer reserves the right to make changes to the program and speakers.
              </p>
            </ContentPanel>
          </SectionSurface>
        </div>

        {/* Right Column */}
        <div className="space-y-8">

          <SectionSurface>
            <h2 className="mb-4 text-xl font-bold tracking-tight">Edition Overview</h2>
            <div className="space-y-3">
              <StatCard icon={<Layers className="h-5 w-5" />} label="Sub-Events" value={(event.subEvents?.length ?? 0).toString()} />
              <StatCard icon={<BarChart3 className="h-5 w-5" />} label="Capacity" value={event.capacity.toLocaleString()} />
              <StatCard icon={<CalendarDays className="h-5 w-5" />} label="Duration" value={`${Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1} days`} />
              <StatCard icon={<Handshake className="h-5 w-5" />} label="Partners" value={partners.length.toString()} />
            </div>
          </SectionSurface>

          <SectionSurface>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight">
              <Grid3x3 className="h-5 w-5 text-muted-foreground" />
              Related Entities
            </h2>
            <div className="space-y-2">
              {/* Guest Invites */}
              <Link href={`/events/${eventId}/guests`} className="flex items-center gap-3 rounded-2xl border bg-card p-4 transition-all hover:shadow-sm group">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10">
                  <Gift className="h-5 w-5 text-accent-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Guest Invites</p>
                  <p className="text-xs text-muted-foreground">{guestInvites.length} total · {guestInvites.filter((g) => g.status === "confirmed").length} confirmed</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:text-muted-foreground/80" />
              </Link>

              {/* Ticketing */}
              <Link href={`/events/${eventId}/ticketing`} className="flex items-center gap-3 rounded-2xl border bg-card p-4 transition-all hover:shadow-sm group">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10">
                  <Ticket className="h-5 w-5 text-accent-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Ticketing</p>
                  <p className="text-xs text-muted-foreground">{ticketTypes.length} types · {tickets.length} tickets</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:text-muted-foreground/80" />
              </Link>

              {/* Orders */}
              <Link href={`/events/${eventId}/orders`} className="flex items-center gap-3 rounded-2xl border bg-card p-4 transition-all hover:shadow-sm group">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10">
                  <ShoppingBag className="h-5 w-5 text-accent-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Orders</p>
                  <p className="text-xs text-muted-foreground">{orders.length} total · {orders.filter((o) => o.status === "CONFIRMED").length} confirmed</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:text-muted-foreground/80" />
              </Link>

              {/* Zones */}
              <Link href={`/events/${eventId}/zones`} className="flex items-center gap-3 rounded-2xl border bg-card p-4 transition-all hover:shadow-sm group">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10">
                  <Grid3x3 className="h-5 w-5 text-accent-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Zones</p>
                  <p className="text-xs text-muted-foreground">{zones.length} zones · {zones.reduce((s, z) => s + z.capacity, 0).toLocaleString()} capacity</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:text-muted-foreground/80" />
              </Link>

              {/* Communications */}
              <Link href={`/events/${eventId}/communications`} className="flex items-center gap-3 rounded-2xl border bg-card p-4 transition-all hover:shadow-sm group">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10">
                  <MessageSquare className="h-5 w-5 text-accent-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Communications</p>
                  <p className="text-xs text-muted-foreground">{campaigns.length} campaigns · {campaigns.filter((c) => c.status === "SENT").length} sent</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all group-hover:text-muted-foreground/80" />
              </Link>
            </div>
          </SectionSurface>

          <SectionSurface>
            <h2 className="mb-4 text-xl font-bold tracking-tight">Attendance Trend</h2>
            <AttendanceTrend eventId={event.id} startDate={event.startDate} endDate={event.endDate} />
          </SectionSurface>

          <SectionSurface>
            <h2 className="mb-4 text-xl font-bold tracking-tight">Venue Details</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span className="text-sm">{event.venue}</span>
              </div>
              <div className="overflow-hidden rounded-2xl bg-muted p-20 text-center text-sm text-muted-foreground">
                Map Placeholder
              </div>
            </div>
          </SectionSurface>

          {partners.length > 0 && (
            <SectionSurface>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold tracking-tight">
                <Handshake className="h-5 w-5" />
                Partners & Sponsors
              </h2>
              <div className="space-y-2">
                {partners.map((p) => (
                  <div key={p.id} className="flex items-center gap-3 rounded-2xl border bg-card p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs capitalize text-muted-foreground">{p.type.toLowerCase()}</p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                    p.type === "SPONSOR"
                      ? "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold"
                      : p.type === "MEDIA"
                        ? "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold"
                        : "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold"
                    }`}>
                      {p.type}
                    </span>
                  </div>
                ))}
              </div>
            </SectionSurface>
          )}

          <SectionSurface>
            <h2 className="mb-4 text-xl font-bold tracking-tight">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full cursor-pointer rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Edit Event
              </button>
              <button className="w-full cursor-pointer rounded-xl border bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
                View Public Page
              </button>
              <button className="w-full cursor-pointer rounded-xl border bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
                Duplicate Event
              </button>
            </div>
          </SectionSurface>
        </div>
      </div>
    </div>
  );
}

export default async function EventDetailPage({ params }: Props) {
  const session = await getSession();

  if (session) {
    return <DashboardEventDetailPage params={params} />;
  }

  return <PublicEventDetailPage params={params} />;
}
