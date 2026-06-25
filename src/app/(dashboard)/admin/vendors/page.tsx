import { PageHeader } from "@/components/layout/PageHeader";

export default function VendorsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Vendors" description="Manage event vendors." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Vendors" }]} />
    </div>
  );
}
