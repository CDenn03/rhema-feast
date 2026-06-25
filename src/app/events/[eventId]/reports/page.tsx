"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getMockEventMetrics } from "@/features/reports/mock";
import { getMockOrders } from "@/features/orders/mock";
import { getMockGuestInvites } from "@/features/guests/mock";
import {
  BarChart3, Users, UserCheck, DollarSign, Ticket,
  TrendingUp, CalendarDays, Clock,
} from "lucide-react";

export default function EventReportsPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const metrics = useMemo(() => getMockEventMetrics(eventId), [eventId]);
  const orders = useMemo(() => getMockOrders(eventId), [eventId]);
  const guests = useMemo(() => getMockGuestInvites(eventId), [eventId]);

  const totalOrders = orders.length;
  const confirmedOrders = orders.filter((o) => o.status === "CONFIRMED").length;
  const conversionRate = metrics.totalRegistrations > 0
    ? Math.round((metrics.ticketsSold / metrics.totalRegistrations) * 100)
    : 0;
  const guestResponseCount = guests.filter((g) => g.status === "confirmed" || g.status === "declined").length;
  const confirmedGuests = guests.filter((g) => g.status === "confirmed").length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports"
        description="Event performance metrics and KPIs."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Events", href: "/events" },
          { label: "Reports" },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Users className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Registrations</p>
              <p className="text-2xl font-bold">{metrics.totalRegistrations.toLocaleString()}</p>
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
              <p className="text-2xl font-bold">{metrics.checkedIn.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Ticket className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tickets Sold</p>
              <p className="text-2xl font-bold">{metrics.ticketsSold.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <DollarSign className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="text-2xl font-bold">KES {metrics.revenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionSurface>
          <h2 className="mb-4 text-xl font-bold tracking-tight">Ticket Performance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gold/10">
                  <TrendingUp className="h-5 w-5 text-accent-gold" />
                </div>
                <div>
                  <p className="text-sm font-medium">Conversion Rate</p>
                  <p className="text-xs text-muted-foreground">Registrations → Tickets Sold</p>
                </div>
              </div>
              <p className="text-2xl font-bold">{conversionRate}%</p>
            </div>
            <div className="flex items-center justify-between rounded-2xl border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gold/10">
                  <UserCheck className="h-5 w-5 text-accent-gold" />
                </div>
                <div>
                  <p className="text-sm font-medium">Check-in Rate</p>
                  <p className="text-xs text-muted-foreground">Tickets Sold → Checked In</p>
                </div>
              </div>
              <p className="text-2xl font-bold">
                {metrics.ticketsSold > 0 ? Math.round((metrics.checkedIn / metrics.ticketsSold) * 100) : 0}%
              </p>
            </div>
          </div>
        </SectionSurface>

        <SectionSurface>
          <h2 className="mb-4 text-xl font-bold tracking-tight">Order & Guest Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gold/10">
                  <CalendarDays className="h-5 w-5 text-accent-gold" />
                </div>
                <div>
                  <p className="text-sm font-medium">Total Orders</p>
                  <p className="text-xs text-muted-foreground">{confirmedOrders} confirmed</p>
                </div>
              </div>
              <p className="text-2xl font-bold">{totalOrders}</p>
            </div>
            <div className="flex items-center justify-between rounded-2xl border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gold/10">
                  <Users className="h-5 w-5 text-accent-gold" />
                </div>
                <div>
                  <p className="text-sm font-medium">Guest Responses</p>
                  <p className="text-xs text-muted-foreground">{confirmedGuests} confirmed</p>
                </div>
              </div>
              <p className="text-2xl font-bold">{guestResponseCount}</p>
            </div>
          </div>
        </SectionSurface>
      </div>
    </div>
  );
}
