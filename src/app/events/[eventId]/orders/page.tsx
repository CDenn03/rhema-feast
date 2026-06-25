"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getMockOrders } from "@/features/orders/mock";
import {
  ShoppingBag, Search, CheckCircle2, XCircle, Clock,
  AlertTriangle, DollarSign,
} from "lucide-react";

const statusStyles: Record<string, string> = {
  CONFIRMED: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
  PENDING: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
  CANCELLED: "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
  REFUNDED: "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
};

export default function EventOrdersPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const orders = useMemo(() => getMockOrders(eventId), [eventId]);
  const [search, setSearch] = useState("");

  const totalRevenue = orders.filter((o) => o.status === "CONFIRMED").reduce((s, o) => s + o.totalAmount, 0);
  const confirmedCount = orders.filter((o) => o.status === "CONFIRMED").length;
  const pendingCount = orders.filter((o) => o.status === "PENDING").length;
  const cancelledCount = orders.filter((o) => o.status === "CANCELLED" || o.status === "REFUNDED").length;

  const filtered = useMemo(() => {
    if (!search) return orders;
    const q = search.toLowerCase();
    return orders.filter((o) => o.id.toLowerCase().includes(q));
  }, [orders, search]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Orders"
        description="Track ticket orders, merchandise purchases, and transactions."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Events", href: "/events" },
          { label: "Orders" },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <ShoppingBag className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <DollarSign className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Revenue (Confirmed)</p>
              <p className="text-2xl font-bold">KES {totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <CheckCircle2 className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Confirmed</p>
              <p className="text-2xl font-bold">{confirmedCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <AlertTriangle className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cancelled / Refunded</p>
              <p className="text-2xl font-bold">{cancelledCount}</p>
            </div>
          </div>
        </div>
      </div>

      <SectionSurface>
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by order ID..." className="w-full rounded-xl border bg-card py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring" />
          </div>
        </div>
        <div className="space-y-3">
          {filtered.map((order) => (
            <div key={order.id} className="rounded-2xl border bg-card p-5 transition-all hover:shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.items.length} item(s)</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg font-bold">{order.currency} {order.totalAmount.toLocaleString()}</p>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider mt-1 ${statusStyles[order.status]}`}>
                    {order.status === "CONFIRMED" && <CheckCircle2 className="h-3 w-3" />}
                    {order.status === "PENDING" && <Clock className="h-3 w-3" />}
                    {order.status === "CANCELLED" && <XCircle className="h-3 w-3" />}
                    {order.status === "REFUNDED" && <AlertTriangle className="h-3 w-3" />}
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {order.items.map((item) => (
                  <span key={item.id} className="inline-flex items-center gap-1 rounded-lg bg-muted px-2.5 py-1 text-xs">
                    {item.name} × {item.quantity}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[10px] text-muted-foreground">
                {new Date(order.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
              </p>
            </div>
          ))}
        </div>
      </SectionSurface>
    </div>
  );
}
