import { getSession } from "@/lib/auth";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getPublicEvents, getDashboardEvents } from "@/features/events/queries";
import { EventCard } from "@/features/events/components/EventCard";

export const dynamic = "force-dynamic";

async function PublicEventsPage() {
  const result = await getPublicEvents();

  return (
    <main className="container mx-auto py-16">
      <PageHeader
        title="Events"
        description="Discover and attend upcoming events."
        className="mb-12"
      />
      {!result || result.data.length === 0 ? (
        <p className="text-muted-foreground">No events available.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {result.data.map((event) => (
            <EventCard key={event.id} event={event} showRegister />
          ))}
        </div>
      )}
    </main>
  );
}

async function DashboardEventsPage() {
  const result = await getDashboardEvents();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Events"
        description="Manage all your events."
        breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Events" }]}
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

export default async function EventsPage() {
  const session = await getSession();

  if (session) {
    return <DashboardEventsPage />;
  }

  return <PublicEventsPage />;
}
