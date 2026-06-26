import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getSeriesById, getEditionsBySeries } from "@/features/events/queries";
import { EditionCard } from "@/features/events/components/EditionCard";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ seriesId: string }>;
}

export default async function SeriesEditionsPage({ params }: Readonly<Props>) {
  const { seriesId } = await params;
  const [series, editions] = await Promise.all([
    getSeriesById(seriesId),
    getEditionsBySeries(seriesId),
  ]);

  if (!series) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={series.title}
        description={series.description}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Events", href: "/admin/events" },
          { label: series.title },
        ]}
      />
      {editions.length === 0 ? (
        <SectionSurface>
          <p className="text-muted-foreground">
            No editions yet. Create the first edition for this series.
          </p>
        </SectionSurface>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {editions.map((edition) => (
            <EditionCard key={edition.id} edition={edition} />
          ))}
        </div>
      )}
    </div>
  );
}
