import { PageHeader } from "@/components/layout/PageHeader";
import { POSCart } from "@/features/pos/components/POSCart";
import { POSProductGrid } from "@/features/pos/components/POSProductGrid";
import { getMockPOSProducts } from "@/features/pos/mock";
import { ShoppingCart, TrendingUp, Receipt, DollarSign } from "lucide-react";

export const dynamic = "force-dynamic";

function StatCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
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

const RECENT_TRANSACTIONS = [
  { id: "TXN-001", items: 3, total: 850, payment: "M-Pesa", status: "Completed", time: "10:32 AM", cashier: "Jane" },
  { id: "TXN-002", items: 1, total: 200, payment: "Cash", status: "Completed", time: "10:15 AM", cashier: "John" },
  { id: "TXN-003", items: 5, total: 1250, payment: "M-Pesa", status: "Completed", time: "09:48 AM", cashier: "Jane" },
  { id: "TXN-004", items: 2, total: 400, payment: "Cash", status: "Completed", time: "09:22 AM", cashier: "John" },
  { id: "TXN-005", items: 4, total: 1100, payment: "M-Pesa", status: "Voided", time: "08:55 AM", cashier: "Jane" },
];

const STATUS_BADGE: Record<string, string> = {
  Completed: "bg-green-500/15 text-green-600 dark:text-green-400",
  Voided: "bg-destructive/10 text-destructive",
  Pending: "bg-amber-500/10 text-amber-600",
};

export default function POSPage() {
  const products = getMockPOSProducts();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Point of Sale"
        description="Process transactions, sell merchandise, and manage giving."
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "POS" }]}
      />

      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard icon={<DollarSign className="h-5 w-5" />} label="Today's Sales" value="KES 3,800" sub="12 transactions" />
        <StatCard icon={<Receipt className="h-5 w-5" />} label="Transactions" value="12" sub="5 voided" />
        <StatCard icon={<ShoppingCart className="h-5 w-5" />} label="Items Sold" value="47" sub="avg 3.9 per sale" />
        <StatCard icon={<TrendingUp className="h-5 w-5" />} label="Avg. Ticket" value="KES 317" sub="+8% vs yesterday" />
      </div>

      <div className="grid flex-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border bg-card p-4">
          <h2 className="mb-4 px-1 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Products</h2>
          <POSProductGrid products={products} />
        </div>
        <POSCart />
      </div>

      <div className="rounded-2xl border bg-card p-5">
        <h2 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 pr-4">ID</th>
                <th className="pb-3 pr-4">Time</th>
                <th className="pb-3 pr-4">Items</th>
                <th className="pb-3 pr-4">Total</th>
                <th className="pb-3 pr-4">Payment</th>
                <th className="pb-3 pr-4">Cashier</th>
                <th className="pb-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_TRANSACTIONS.map((txn) => (
                <tr key={txn.id} className="border-b last:border-0">
                  <td className="py-3 pr-4 font-medium">{txn.id}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{txn.time}</td>
                  <td className="py-3 pr-4">{txn.items}</td>
                  <td className="py-3 pr-4 font-medium">KES {txn.total.toLocaleString()}</td>
                  <td className="py-3 pr-4">{txn.payment}</td>
                  <td className="py-3 pr-4 text-muted-foreground">{txn.cashier}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${STATUS_BADGE[txn.status] ?? ""}`}>
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
