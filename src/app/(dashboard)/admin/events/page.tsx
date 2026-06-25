import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getDashboardEvents } from "@/features/events/queries";
import { EventCard } from "@/features/events/components/EventCard";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const result = await getDashboardEvents();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Events"
        description="Create, manage, and oversee all your events."
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Events" }]}
      />
      {result.data.length === 0 ? (
        <p className="text-muted-foreground">No events found.</p>
      ) : (
        <SectionSurface className="p-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {result.data.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </SectionSurface>
      )}
    </div>
  );
}
