import { PageHeader } from "@/components/layout/PageHeader";

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Welcome back. Here's an overview." breadcrumbs={[{ label: "Dashboard" }]} />
    </div>
  );
}
