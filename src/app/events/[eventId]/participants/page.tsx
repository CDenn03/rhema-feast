"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCheckInStore } from "@/features/check-in/store";
import { getMockAttendees } from "@/features/check-in/mock";
import { getMockGuestInvites } from "@/features/guests/mock";
import {
  Users, UserCheck, Clock, Search, BarChart3,
  CheckCircle2, UserX, Undo2, Filter,
} from "lucide-react";

export default function EventAttendeesPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const { entries, isCheckedIn, undoCheckIn } = useCheckInStore();

  const [search, setSearch] = useState("");
  const [ticketFilter, setTicketFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const attendees = useMemo(() => getMockAttendees(eventId), [eventId]);
  const guests = useMemo(() => getMockGuestInvites(eventId), [eventId]);

  const checkedIn = useMemo(
    () => entries.filter((e) => e.eventId === eventId),
    [entries, eventId],
  );

  const ticketTypes = useMemo(
    () => [...new Set(attendees.map((a) => a.ticketPackageName))],
    [attendees],
  );

  const allAttendees = useMemo(() => {
    const list: Array<{
      id: string;
      sourceType: "guest" | "companion" | "ticket";
      sourceId: string;
      name: string;
      email: string;
      category: string;
      ticketPackage: string;
      checkInTime: string | null;
    }> = [];

    for (const a of attendees) {
      const entry = checkedIn.find((e) => e.sourceType === "ticket" && e.sourceId === a.id);
      list.push({
        id: a.id,
        sourceType: "ticket",
        sourceId: a.id,
        name: a.name,
        email: a.email,
        category: a.ticketPackageName,
        ticketPackage: a.ticketPackageName,
        checkInTime: entry?.checkInTime ?? null,
      });
    }

    for (const g of guests) {
      if (g.status === "confirmed" || g.status === "pending") {
        const entry = checkedIn.find((e) => e.sourceType === "guest" && e.sourceId === g.id);
        list.push({
          id: g.id,
          sourceType: "guest",
          sourceId: g.id,
          name: g.name,
          email: g.email,
          category: `${g.category?.name ?? "Guest"} (Guest)`,
          ticketPackage: "Guest Invite",
          checkInTime: entry?.checkInTime ?? null,
        });
        for (const c of g.companions ?? []) {
          const compEntry = checkedIn.find((e) => e.sourceType === "companion" && e.sourceId === c.id);
          list.push({
            id: c.id,
            sourceType: "companion",
            sourceId: c.id,
            name: c.name,
            email: "",
            category: `${g.category?.name ?? "Guest"} (Companion)`,
            ticketPackage: `Companion of ${g.name}`,
            checkInTime: compEntry?.checkInTime ?? null,
          });
        }
      }
    }

    return list;
  }, [attendees, guests, checkedIn]);

  const filtered = useMemo(() => {
    return allAttendees.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.email.toLowerCase().includes(q)) return false;
      }
      if (ticketFilter && p.ticketPackage !== ticketFilter) return false;
      if (statusFilter === "checkedin" && !p.checkInTime) return false;
      if (statusFilter === "yettoarrive" && p.checkInTime) return false;
      return true;
    });
  }, [allAttendees, search, ticketFilter, statusFilter]);

  const totalCount = allAttendees.length;
  const checkedInCount = allAttendees.filter((a) => a.checkInTime).length;
  const yetToArriveCount = totalCount - checkedInCount;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Attendees"
        description="Real-time attendance tracking and management."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Events", href: "/events" },
          { label: "Attendees" },
        ]}
      />

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Users className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{totalCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <UserCheck className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Checked In</p>
              <p className="text-2xl font-bold">{checkedInCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Clock className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Yet to Arrive</p>
              <p className="text-2xl font-bold">{yetToArriveCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <BarChart3 className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
              <p className="text-2xl font-bold">
                {totalCount > 0 ? Math.round((checkedInCount / totalCount) * 100) : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Gauge */}
      <SectionSurface>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold tracking-tight">Real-Time Attendance</h2>
          <span className="text-sm text-muted-foreground">
            {checkedInCount} / {totalCount} checked in
          </span>
        </div>
        <div className="mt-4">
          <div className="flex h-4 overflow-hidden rounded-full bg-muted">
            <div
              className="rounded-full bg-accent-gold transition-all duration-700"
              style={{ width: `${totalCount > 0 ? (checkedInCount / totalCount) * 100 : 0}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-accent-gold" />
              {checkedInCount} checked in
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
              {yetToArriveCount} yet to arrive
            </span>
          </div>
        </div>
      </SectionSurface>

      {/* Filters & List */}
      <SectionSurface>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-xl border bg-card py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
            />
          </div>

          <select
            value={ticketFilter}
            onChange={(e) => setTicketFilter(e.target.value)}
            className="rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
          >
            <option value="">All Ticket Types</option>
            <option value="Guest Invite">Guest Invites</option>
            {ticketTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
          >
            <option value="all">All Status</option>
            <option value="checkedin">Checked In</option>
            <option value="yettoarrive">Yet to Arrive</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-muted/50 p-12 text-center">
            <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No attendees match your filters.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((person) => (
              <div
                key={`${person.sourceType}-${person.sourceId}`}
                className="flex items-center gap-4 rounded-2xl border bg-card p-4 transition-all hover:shadow-sm"
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  person.checkInTime
                    ? "bg-accent-gold/10 dark:bg-accent-gold/15"
                    : "bg-muted"
                }`}>
                  {person.checkInTime ? (
                    <CheckCircle2 className="h-5 w-5 text-accent-gold dark:text-accent-gold" />
                  ) : (
                    <UserX className="h-5 w-5 text-muted-foreground/50" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{person.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {person.category}
                    {person.email ? ` · ${person.email}` : ""}
                  </p>
                  <p className="text-xs text-muted-foreground/60">{person.ticketPackage}</p>
                </div>
                {person.checkInTime ? (
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent-gold/10 px-2.5 py-0.5 text-[11px] font-semibold text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold">
                      <CheckCircle2 className="h-3 w-3" />
                      Checked In
                    </span>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {new Date(person.checkInTime).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                    </p>
                    <button
                      onClick={() => {
                        const entry = checkedIn.find(
                          (e) => e.sourceType === person.sourceType && e.sourceId === person.sourceId,
                        );
                        if (entry) undoCheckIn(entry.id);
                      }}
                      className="mt-1 text-[10px] text-destructive hover:underline"
                    >
                      Undo
                    </button>
                  </div>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Yet to Arrive
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Showing {filtered.length} of {allAttendees.length} attendees
        </p>
      </SectionSurface>
    </div>
  );
}
