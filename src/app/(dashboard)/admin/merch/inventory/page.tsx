import { PageHeader } from "@/components/layout/PageHeader";
import { getMockMerch } from "@/features/merch/mock";
import { Package, AlertTriangle, Shirt, DollarSign } from "lucide-react";

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

const CATEGORY_COLORS: Record<string, string> = {
  Apparel: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  Stationery: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Media: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  Accessories: "bg-green-500/10 text-green-600 dark:text-green-400",
};

export default function MerchInventoryPage() {
  const items = getMockMerch();
  const totalStock = items.reduce((sum, i) => sum + i.stock, 0);
  const totalValue = items.reduce((sum, i) => sum + i.price * i.stock, 0);
  const lowStock = items.filter((i) => i.stock < 50);

  return (
    <div className="space-y-6">
      <PageHeader title="Merch Inventory" description="Manage merchandise inventory." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Merch" }]} />

      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard icon={<Package className="h-5 w-5" />} label="Product Types" value={items.length.toString()} sub={`${items.filter((i) => i.stock > 0).length} in stock`} />
        <StatCard icon={<Shirt className="h-5 w-5" />} label="Total Stock" value={totalStock.toLocaleString()} sub={`${items.length} SKUs`} />
        <StatCard icon={<DollarSign className="h-5 w-5" />} label="Inventory Value" value={`KES ${totalValue.toLocaleString()}`} sub="at retail price" />
        <StatCard icon={<AlertTriangle className="h-5 w-5" />} label="Low Stock Alerts" value={lowStock.length.toString()} sub="items below 50 units" />
      </div>

      <div className="rounded-2xl border bg-card p-5">
        <h2 className="mb-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">All Merchandise</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="pb-3 pr-4">Item</th>
                <th className="pb-3 pr-4">SKU</th>
                <th className="pb-3 pr-4">Category</th>
                <th className="pb-3 pr-4">Price</th>
                <th className="pb-3 pr-4">Stock</th>
                <th className="pb-3 pr-4">Value</th>
                <th className="pb-3 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="py-3 pr-4 font-medium">{item.name}</td>
                  <td className="py-3 pr-4 text-xs text-muted-foreground font-mono">{item.sku}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${CATEGORY_COLORS[item.category] ?? ""}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 pr-4">KES {item.price.toLocaleString()}</td>
                  <td className="py-3 pr-4">
                    <span className={item.stock < 50 ? "text-destructive font-semibold" : ""}>{item.stock}</span>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">KES {(item.price * item.stock).toLocaleString()}</td>
                  <td className="py-3 pr-4">
                    {item.stock === 0 ? (
                      <span className="inline-flex items-center rounded-full bg-destructive/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-destructive">Out of Stock</span>
                    ) : item.stock < 50 ? (
                      <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">Low</span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-green-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">In Stock</span>
                    )}
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
