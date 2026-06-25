import { PageHeader } from "@/components/layout/PageHeader";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="System administration and configuration." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Settings" }]} />
    </div>
  );
}
