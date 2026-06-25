import { PageHeader } from "@/components/layout/PageHeader";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Payments" description="View and manage payments." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Payments" }]} />
    </div>
  );
}
