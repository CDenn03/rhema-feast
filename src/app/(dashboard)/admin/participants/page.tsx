import { PageHeader } from "@/components/layout/PageHeader";

export default function AttendeesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Attendees" description="View and manage event attendees." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Attendees" }]} />
    </div>
  );
}
