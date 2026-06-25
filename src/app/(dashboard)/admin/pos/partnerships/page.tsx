import { PageHeader } from "@/components/layout/PageHeader";

export default function POSPartnershipsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="POS Partnerships" description="Manage POS partnerships." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "POS", href: "/admin/pos" }, { label: "Partnerships" }]} />
    </div>
  );
}
