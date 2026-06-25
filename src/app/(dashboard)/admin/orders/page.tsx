import { PageHeader } from "@/components/layout/PageHeader";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Orders" description="View and manage orders." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Orders" }]} />
    </div>
  );
}
