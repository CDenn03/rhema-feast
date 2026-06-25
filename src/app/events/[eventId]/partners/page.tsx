"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getMockPartners } from "@/features/partners/mock";
import { Handshake, Building2, Search, CheckCircle2, Clock, XCircle } from "lucide-react";

const typeStyles: Record<string, string> = {
  SPONSOR: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
  MEDIA: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
  VENDOR: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
};

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
  PENDING: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
  INACTIVE: "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
};

export default function EventPartnersPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const partners = useMemo(() => getMockPartners(), []);
  const [search, setSearch] = useState("");

  const activeCount = partners.filter((p) => p.status === "ACTIVE").length;
  const sponsorCount = partners.filter((p) => p.type === "SPONSOR").length;
  const mediaCount = partners.filter((p) => p.type === "MEDIA").length;

  const filtered = useMemo(() => {
    if (!search) return partners;
    const q = search.toLowerCase();
    return partners.filter((p) => p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q));
  }, [partners, search]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Partners"
        description="Manage sponsors, media partners, and vendors."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Events", href: "/events" },
          { label: "Partners" },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <CheckCircle2 className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Partners</p>
              <p className="text-2xl font-bold">{activeCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Handshake className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sponsors</p>
              <p className="text-2xl font-bold">{sponsorCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Building2 className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Media Partners</p>
              <p className="text-2xl font-bold">{mediaCount}</p>
            </div>
          </div>
        </div>
      </div>

      <SectionSurface>
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search partners..." className="w-full rounded-xl border bg-card py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring" />
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Type</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Contact</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((p) => (
                <tr key={p.id} className="bg-card transition-colors hover:bg-muted/30">
                  <td className="px-5 py-4 font-medium">{p.name}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${typeStyles[p.type]}`}>{p.type}</span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm">{p.email}</p>
                    {p.phone && <p className="text-xs text-muted-foreground">{p.phone}</p>}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${statusStyles[p.status]}`}>
                      {p.status === "ACTIVE" && <CheckCircle2 className="h-3 w-3" />}
                      {p.status === "PENDING" && <Clock className="h-3 w-3" />}
                      {p.status === "INACTIVE" && <XCircle className="h-3 w-3" />}
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionSurface>
    </div>
  );
}
