"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getMockTicketTypes, getMockTickets } from "@/features/ticketing/mock";
import {
  Ticket, Search, CheckCircle2, XCircle, AlertTriangle, Clock, Package,
} from "lucide-react";

const statusStyles: Record<string, string> = {
  AVAILABLE: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
  SOLD_OUT: "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
  RESERVED: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
  WAITLIST: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
};

const ticketStatusStyles: Record<string, string> = {
  ACTIVE: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
  USED: "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
  CANCELLED: "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
  REFUNDED: "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
};

export default function EventTicketingPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const ticketTypes = useMemo(() => getMockTicketTypes(eventId), [eventId]);
  const tickets = useMemo(() => getMockTickets(eventId), [eventId]);

  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"types" | "tickets">("types");

  const totalCapacity = ticketTypes.reduce((s, t) => s + t.capacity, 0);
  const totalSold = ticketTypes.reduce((s, t) => s + t.sold, 0);
  const availableTypes = ticketTypes.filter((t) => t.status === "AVAILABLE").length;
  const soldOutTypes = ticketTypes.filter((t) => t.status === "SOLD_OUT").length;

  const filteredTickets = useMemo(() => {
    if (!search) return tickets;
    const q = search.toLowerCase();
    return tickets.filter((t) => t.code.toLowerCase().includes(q));
  }, [tickets, search]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Ticketing"
        description="Manage ticket types, pricing, and issued tickets."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Events", href: "/events" },
          { label: "Ticketing" },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Package className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ticket Types</p>
              <p className="text-2xl font-bold">{ticketTypes.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Ticket className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Tickets Sold</p>
              <p className="text-2xl font-bold">{totalSold.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <CheckCircle2 className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Available Types</p>
              <p className="text-2xl font-bold">{availableTypes}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <XCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sold Out Types</p>
              <p className="text-2xl font-bold">{soldOutTypes}</p>
            </div>
          </div>
        </div>
      </div>

      <SectionSurface>
        <div className="mb-6 flex items-center gap-4">
          <div className="flex gap-1 rounded-xl border bg-card p-1">
            <button onClick={() => setTab("types")} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${tab === "types" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>Ticket Types</button>
            <button onClick={() => setTab("tickets")} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${tab === "tickets" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>Issued Tickets</button>
          </div>
          {tab === "tickets" && (
            <div className="relative flex-1 max-w-xs ml-auto">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by ticket code..." className="w-full rounded-xl border bg-card py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring" />
            </div>
          )}
        </div>

        {tab === "types" ? (
          <div className="overflow-hidden rounded-2xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">Name</th>
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">Price</th>
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">Capacity</th>
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">Sold</th>
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">Available</th>
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {ticketTypes.map((tt) => (
                  <tr key={tt.id} className="bg-card transition-colors hover:bg-muted/30">
                    <td className="px-5 py-4">
                      <p className="font-medium">{tt.name}</p>
                      {tt.description && <p className="text-xs text-muted-foreground">{tt.description}</p>}
                    </td>
                    <td className="px-5 py-4 font-mono text-sm">{tt.currency} {tt.price.toLocaleString()}</td>
                    <td className="px-5 py-4">{tt.capacity.toLocaleString()}</td>
                    <td className="px-5 py-4">{tt.sold.toLocaleString()}</td>
                    <td className="px-5 py-4">{(tt.capacity - tt.sold).toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${statusStyles[tt.status]}`}>{tt.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          filteredTickets.length === 0 ? (
            <div className="rounded-2xl bg-muted/50 p-12 text-center">
              <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">No tickets found.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-5 py-3 text-left font-medium text-muted-foreground">Code</th>
                    <th className="px-5 py-3 text-left font-medium text-muted-foreground">Status</th>
                    <th className="px-5 py-3 text-left font-medium text-muted-foreground">Purchased</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredTickets.map((t) => (
                    <tr key={t.id} className="bg-card transition-colors hover:bg-muted/30">
                      <td className="px-5 py-4 font-mono text-sm font-medium">{t.code}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${ticketStatusStyles[t.status]}`}>
                          {t.status === "ACTIVE" && <CheckCircle2 className="h-3 w-3" />}
                          {t.status === "USED" && <Clock className="h-3 w-3" />}
                          {t.status === "CANCELLED" && <XCircle className="h-3 w-3" />}
                          {t.status === "REFUNDED" && <AlertTriangle className="h-3 w-3" />}
                          {t.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-muted-foreground">{new Date(t.purchasedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </SectionSurface>
    </div>
  );
}
