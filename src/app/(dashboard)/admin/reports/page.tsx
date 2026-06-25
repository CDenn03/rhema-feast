import { PageHeader } from "@/components/layout/PageHeader";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="View event reports and analytics." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Reports" }]} />
    </div>
  );
}
