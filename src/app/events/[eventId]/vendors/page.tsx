"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getMockPartners } from "@/features/partners/mock";
import { Truck, Search, Package, DollarSign, Star } from "lucide-react";

export default function EventVendorsPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const vendors = useMemo(() => getMockPartners().filter((p) => p.type === "VENDOR"), []);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return vendors;
    const q = search.toLowerCase();
    return vendors.filter((v) => v.name.toLowerCase().includes(q));
  }, [vendors, search]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Vendors"
        description="Manage service vendors and product suppliers."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Events", href: "/events" },
          { label: "Vendors" },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Truck className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Vendors</p>
              <p className="text-2xl font-bold">{vendors.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Package className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="text-2xl font-bold">{vendors.filter((v) => v.status === "ACTIVE").length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <DollarSign className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">{vendors.filter((v) => v.status === "PENDING").length}</p>
            </div>
          </div>
        </div>
      </div>

      <SectionSurface>
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search vendors..." className="w-full rounded-xl border bg-card py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring" />
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-muted/50 p-12 text-center">
            <Truck className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No vendors registered yet.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">Vendor</th>
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">Contact</th>
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((v) => (
                  <tr key={v.id} className="bg-card transition-colors hover:bg-muted/30">
                    <td className="px-5 py-4 font-medium">{v.name}</td>
                    <td className="px-5 py-4">
                      <p className="text-sm">{v.email}</p>
                      {v.phone && <p className="text-xs text-muted-foreground">{v.phone}</p>}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                        v.status === "ACTIVE" ? "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold" :
                        v.status === "PENDING" ? "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold" :
                        "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground"
                      }`}>{v.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionSurface>
    </div>
  );
}
