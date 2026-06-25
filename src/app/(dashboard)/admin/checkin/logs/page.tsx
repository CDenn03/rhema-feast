import { PageHeader } from "@/components/layout/PageHeader";

export default function CheckInLogsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Check-in Logs" description="View check-in history." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Check-in", href: "/admin/checkin" }, { label: "Logs" }]} />
    </div>
  );
}
