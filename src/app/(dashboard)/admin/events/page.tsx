import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getSeries } from "@/features/events/queries";
import { SeriesCard } from "@/features/events/components/SeriesCard";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const series = await getSeries();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Event Series"
        description="Manage your event series — annual conferences, weekly fellowships, and more."
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Events" }]}
      />
      {series.length === 0 ? (
        <p className="text-muted-foreground">No event series found.</p>
      ) : (
        <SectionSurface className="p-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {series.map((s) => (
              <SeriesCard key={s.id} series={s} />
            ))}
          </div>
        </SectionSurface>
      )}
    </div>
  );
}
