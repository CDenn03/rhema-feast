import { PageHeader } from "@/components/layout/PageHeader";

export default function MerchInventoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Merch Inventory" description="Manage merchandise inventory." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Merch" }]} />
    </div>
  );
}
