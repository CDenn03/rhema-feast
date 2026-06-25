import { PageHeader } from "@/components/layout/PageHeader";

export default function POSGivingPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Giving" description="Process donations and giving." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "POS", href: "/admin/pos" }, { label: "Giving" }]} />
    </div>
  );
}
