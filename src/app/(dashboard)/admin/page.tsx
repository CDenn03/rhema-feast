import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getSeries, getDashboardEvents } from "@/features/events/queries";
import { getMockOrders } from "@/features/orders/mock";
import { getMockPayments } from "@/features/payments/mock";
import Link from "next/link";
import {
  CalendarDays, MapPin, Users, ArrowRight, Layers,
  Ticket, ShoppingBag, CreditCard, TrendingUp,
  Plus, Settings, ScanLine,
} from "lucide-react";

export const dynamic = "force-dynamic";

function StatCard({
  icon, label, value, sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 transition-all hover:shadow-sm">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-gold/10">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );
}

const STATUS_BADGE: Record<string, string> = {
  DRAFT: "bg-muted text-muted-foreground",
  PUBLISHED: "bg-accent-gold/15 text-accent-gold",
  ONGOING: "bg-green-500/15 text-green-600 dark:text-green-400",
  COMPLETED: "bg-muted text-muted-foreground",
  CANCELLED: "bg-destructive/10 text-destructive",
};

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

const STATUS_ORDER_BADGE: Record<string, string> = {
  PENDING: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  CONFIRMED: "bg-green-500/15 text-green-600 dark:text-green-400",
  CANCELLED: "bg-destructive/10 text-destructive",
  REFUNDED: "bg-muted text-muted-foreground",
};

function formatCurrency(amount: number, currency: string) {
  return `${currency} ${amount.toLocaleString()}`;
}

export default async function DashboardHomePage() {
  const [series, editionsResult, orders, payments] = await Promise.all([
    getSeries(),
    getDashboardEvents(),
    getMockOrders(),
    getMockPayments(),
  ]);

  const editions = editionsResult.data;
  const confirmedOrders = orders.filter((o) => o.status === "CONFIRMED");
  const completedPayments = payments.filter((p) => p.status === "COMPLETED");
  const pendingPayments = payments.filter((p) => p.status === "PENDING");
  const totalRevenue = completedPayments.reduce((s, p) => s + p.amount, 0);
  const totalTickets = editions.reduce(
    (s, e) => s + (e.subEvents?.reduce((ss, se) => ss + se.capacity, 0) ?? e.capacity),
    0,
  );
  const upcomingEditions = editions
    .filter((e) => e.status === "PUBLISHED" || e.status === "ONGOING")
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Welcome back. Here's your event ecosystem at a glance."
        breadcrumbs={[{ label: "Dashboard" }]}
      />

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          icon={<Layers className="h-5 w-5 text-accent-gold" />}
          label="Event Series"
          value={series.length.toString()}
        />
        <StatCard
          icon={<CalendarDays className="h-5 w-5 text-accent-gold" />}
          label="Total Editions"
          value={editions.length.toString()}
          sub={`${editions.filter((e) => e.status === "PUBLISHED" || e.status === "ONGOING").length} active`}
        />
        <StatCard
          icon={<Ticket className="h-5 w-5 text-accent-gold" />}
          label="Total Capacity"
          value={totalTickets.toLocaleString()}
        />
        <StatCard
          icon={<ShoppingBag className="h-5 w-5 text-accent-gold" />}
          label="Orders"
          value={orders.length.toString()}
          sub={`${confirmedOrders.length} confirmed`}
        />
        <StatCard
          icon={<CreditCard className="h-5 w-5 text-accent-gold" />}
          label="Revenue"
          value={formatCurrency(totalRevenue, "KES")}
          sub={`${pendingPayments.length} pending`}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-accent-gold" />}
          label="Tickets Sold"
          value={completedPayments.length.toString()}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Left column — Upcoming events + Quick actions */}
        <div className="space-y-8">
          {/* Upcoming events */}
          <SectionSurface>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight">Upcoming Editions</h2>
              <Link
                href="/admin/events"
                className="text-sm font-medium text-accent-gold transition-colors hover:text-accent-gold/80"
              >
                View all
              </Link>
            </div>
            {upcomingEditions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming editions.</p>
            ) : (
              <div className="divide-y">
                {upcomingEditions.map((ed) => {
                  const start = new Date(ed.startDate);
                  const daysUntil = Math.ceil(
                    (start.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
                  );
                  return (
                    <Link
                      key={ed.id}
                      href={`/events/${ed.id}`}
                      className="flex items-center gap-4 py-4 transition-colors hover:bg-muted/30 first:pt-0 last:pb-0 -mx-1 px-3 rounded-xl"
                    >
                      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-accent-gold/10">
                        <span className="text-lg font-bold leading-none text-accent-gold">
                          {start.getDate()}
                        </span>
                        <span className="text-[10px] font-medium uppercase text-accent-gold/70">
                          {start.toLocaleDateString("en-US", { month: "short" })}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-semibold">{ed.title}</p>
                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_BADGE[ed.status] ?? ""}`}>
                            {ed.status}
                          </span>
                        </div>
                        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span className="truncate">{ed.venue}</span>
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-semibold text-accent-gold">
                          {daysUntil > 0 ? `D-${daysUntil}` : daysUntil === 0 ? "Today" : "Ongoing"}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {daysUntil > 0 ? "days to go" : ""}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </SectionSurface>

          {/* Quick actions */}
          <SectionSurface>
            <h2 className="mb-4 text-lg font-bold tracking-tight">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/admin/events"
                className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-5 text-center transition-all hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gold/10">
                  <Plus className="h-5 w-5 text-accent-gold" />
                </div>
                <span className="text-sm font-medium">New Edition</span>
                <span className="text-[10px] text-muted-foreground">Add to a series</span>
              </Link>
              <Link
                href="/admin/pos"
                className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-5 text-center transition-all hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gold/10">
                  <ScanLine className="h-5 w-5 text-accent-gold" />
                </div>
                <span className="text-sm font-medium">POS</span>
                <span className="text-[10px] text-muted-foreground">Point of sale</span>
              </Link>
              <Link
                href="/admin/checkin"
                className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-5 text-center transition-all hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gold/10">
                  <Users className="h-5 w-5 text-accent-gold" />
                </div>
                <span className="text-sm font-medium">Check-in</span>
                <span className="text-[10px] text-muted-foreground">Scan guests</span>
              </Link>
              <Link
                href="/admin/settings"
                className="flex flex-col items-center gap-2 rounded-2xl border bg-card p-5 text-center transition-all hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gold/10">
                  <Settings className="h-5 w-5 text-accent-gold" />
                </div>
                <span className="text-sm font-medium">Settings</span>
                <span className="text-[10px] text-muted-foreground">Users & roles</span>
              </Link>
            </div>
          </SectionSurface>
        </div>

        {/* Right column — Recent orders */}
        <div className="space-y-8">
          <SectionSurface>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight">Recent Orders</h2>
              <Link
                href="/admin/orders"
                className="text-sm font-medium text-accent-gold transition-colors hover:text-accent-gold/80"
              >
                View all
              </Link>
            </div>
            {recentOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground">No orders yet.</p>
            ) : (
              <div className="divide-y">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">
                          {order.items[0]?.name ?? "Order"}
                          {order.items.length > 1 && ` +${order.items.length - 1}`}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(order.totalAmount, order.currency)} ·{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_ORDER_BADGE[order.status] ?? ""}`}>
                      {STATUS_LABEL[order.status] ?? order.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </SectionSurface>

          {/* Revenue summary */}
          <SectionSurface>
            <h2 className="mb-4 text-lg font-bold tracking-tight">Revenue Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-muted/50 p-4">
                <span className="text-sm text-muted-foreground">Total collected</span>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(totalRevenue, "KES")}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Completed payments</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {completedPayments.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pending payments</span>
                  <span className="font-medium text-amber-600 dark:text-amber-400">
                    {pendingPayments.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Refunded</span>
                  <span className="font-medium text-muted-foreground">
                    {payments.filter((p) => p.status === "REFUNDED").length}
                  </span>
                </div>
              </div>
            </div>
          </SectionSurface>

          {/* Series overview */}
          <SectionSurface>
            <h2 className="mb-4 text-lg font-bold tracking-tight">Series Overview</h2>
            <div className="space-y-3">
              {series.map((s) => {
                const serEditions = editions.filter((e) => e.seriesId === s.id);
                const activeCount = serEditions.filter(
                  (e) => e.status === "PUBLISHED" || e.status === "ONGOING",
                ).length;
                return (
                  <Link
                    key={s.id}
                    href={`/admin/events/${s.id}`}
                    className="flex items-center gap-3 rounded-2xl border bg-card p-4 transition-all hover:shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10">
                      <CalendarDays className="h-5 w-5 text-accent-gold" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{s.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {serEditions.length} editions · {activeCount} active
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                  </Link>
                );
              })}
            </div>
          </SectionSurface>
        </div>
      </div>
    </div>
  );
}
