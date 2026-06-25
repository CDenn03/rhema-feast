import { PageHeader } from "@/components/layout/PageHeader";

export default function TicketingPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Ticketing" description="Configure event ticketing." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Ticketing" }]} />
    </div>
  );
}
