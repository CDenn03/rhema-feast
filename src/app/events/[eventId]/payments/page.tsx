"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getMockPayments } from "@/features/payments/mock";
import { getMockOrders } from "@/features/orders/mock";
import {
  CreditCard, Search, CheckCircle2, XCircle, Clock,
  AlertTriangle, Smartphone, Wallet, DollarSign,
} from "lucide-react";

const statusStyles: Record<string, string> = {
  COMPLETED: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
  PENDING: "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold",
  FAILED: "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
  REFUNDED: "bg-muted text-muted-foreground dark:bg-muted/50 dark:text-muted-foreground",
};

const providerIcons: Record<string, React.ReactNode> = {
  MPESA: <Smartphone className="h-4 w-4" />,
  CARD: <CreditCard className="h-4 w-4" />,
  CASH: <Wallet className="h-4 w-4" />,
};

export default function EventPaymentsPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const eventOrders = useMemo(() => getMockOrders(eventId), [eventId]);
  const allPayments = useMemo(() => getMockPayments(), []);
  const payments = useMemo(() => allPayments.filter((p) => eventOrders.some((o) => o.id === p.orderId)), [allPayments, eventOrders]);

  const [search, setSearch] = useState("");

  const completedTotal = payments.filter((p) => p.status === "COMPLETED").reduce((s, p) => s + p.amount, 0);
  const completedCount = payments.filter((p) => p.status === "COMPLETED").length;
  const pendingCount = payments.filter((p) => p.status === "PENDING").length;
  const failedCount = payments.filter((p) => p.status === "FAILED" || p.status === "REFUNDED").length;

  const filtered = useMemo(() => {
    if (!search) return payments;
    const q = search.toLowerCase();
    return payments.filter((p) => p.reference?.toLowerCase().includes(q) || p.provider.toLowerCase().includes(q));
  }, [payments, search]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Payments"
        description="Track payment transactions across all providers."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Events", href: "/events" },
          { label: "Payments" },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <DollarSign className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Collected</p>
              <p className="text-2xl font-bold">KES {completedTotal.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <CheckCircle2 className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-2xl font-bold">{completedCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Clock className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <AlertTriangle className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Failed / Refunded</p>
              <p className="text-2xl font-bold">{failedCount}</p>
            </div>
          </div>
        </div>
      </div>

      <SectionSurface>
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by reference or provider..." className="w-full rounded-xl border bg-card py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring" />
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Reference</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Provider</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Amount</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-5 py-3 text-left font-medium text-muted-foreground">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((p) => (
                <tr key={p.id} className="bg-card transition-colors hover:bg-muted/30">
                  <td className="px-5 py-4 font-mono text-xs font-medium">{p.reference ?? "—"}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5">
                      {providerIcons[p.provider]}
                      <span>{p.provider}</span>
                    </span>
                  </td>
                  <td className="px-5 py-4 font-mono text-sm font-medium">{p.currency} {p.amount.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${statusStyles[p.status]}`}>
                      {p.status === "COMPLETED" && <CheckCircle2 className="h-3 w-3" />}
                      {p.status === "PENDING" && <Clock className="h-3 w-3" />}
                      {p.status === "FAILED" && <XCircle className="h-3 w-3" />}
                      {p.status === "REFUNDED" && <AlertTriangle className="h-3 w-3" />}
                      {p.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionSurface>
    </div>
  );
}
