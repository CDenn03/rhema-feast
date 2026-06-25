"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getMockZones } from "@/features/zones/mock";
import { Grid3x3, Users, MapPin, BarChart3 } from "lucide-react";

export default function EventZonesPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const zones = useMemo(() => getMockZones(eventId), [eventId]);

  const totalCapacity = zones.reduce((s, z) => s + z.capacity, 0);
  const totalCurrent = zones.reduce((s, z) => s + z.currentCount, 0);
  const avgOccupancy = totalCapacity > 0 ? Math.round((totalCurrent / totalCapacity) * 100) : 0;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Zones"
        description="Manage event zones, sections, and capacity tracking."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Events", href: "/events" },
          { label: "Zones" },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Grid3x3 className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Zones</p>
              <p className="text-2xl font-bold">{zones.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Users className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Capacity</p>
              <p className="text-2xl font-bold">{totalCapacity.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <BarChart3 className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Occupancy</p>
              <p className="text-2xl font-bold">{avgOccupancy}%</p>
            </div>
          </div>
        </div>
      </div>

      <SectionSurface>
        <h2 className="mb-6 text-xl font-bold tracking-tight">Zone Details</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {zones.map((zone) => {
            const occupancyPct = zone.capacity > 0 ? Math.round((zone.currentCount / zone.capacity) * 100) : 0;
            return (
              <div key={zone.id} className="rounded-2xl border bg-card p-5 transition-all hover:shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: `${zone.color ?? "#C89B3C"}20` }}>
                    <MapPin className="h-5 w-5" style={{ color: zone.color ?? "#C89B3C" }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{zone.name}</p>
                    <p className="text-xs text-muted-foreground">{zone.currentCount} / {zone.capacity} occupied</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex h-2.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="rounded-full transition-all duration-700"
                      style={{ width: `${occupancyPct}%`, backgroundColor: zone.color ?? "#C89B3C" }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>{occupancyPct}% full</span>
                    <span>{zone.capacity - zone.currentCount} remaining</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionSurface>
    </div>
  );
}
