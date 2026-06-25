import { PageHeader } from "@/components/layout/PageHeader";

export default function CheckInPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Check-in" description="Manage event check-ins." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Check-in" }]} />
    </div>
  );
}
