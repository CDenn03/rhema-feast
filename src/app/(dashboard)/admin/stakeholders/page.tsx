import { PageHeader } from "@/components/layout/PageHeader";

export default function StakeholdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Stakeholders" description="Manage event stakeholders." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Stakeholders" }]} />
    </div>
  );
}
