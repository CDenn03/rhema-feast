"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { getMockCheckInLogs } from "@/features/checkin/mock";
import { getMockParticipants } from "@/features/participants/mock";
import { ScanLine, Search, Smartphone, Clock, CheckCircle2 } from "lucide-react";

export default function EventEntriesPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const logs = useMemo(() => getMockCheckInLogs(eventId), [eventId]);
  const participants = useMemo(() => getMockParticipants(eventId), [eventId]);
  const [search, setSearch] = useState("");

  const enriched = useMemo(() => {
    return logs.map((log) => {
      const p = participants.find((pp) => pp.id === log.participantId);
      return { ...log, participantName: p ? `${p.firstName} ${p.lastName}` : "Unknown", participantEmail: p?.email ?? "" };
    });
  }, [logs, participants]);

  const uniqueDevices = new Set(logs.map((l) => l.deviceId).filter(Boolean)).size;

  const filtered = useMemo(() => {
    if (!search) return enriched;
    const q = search.toLowerCase();
    return enriched.filter((e) => e.participantName.toLowerCase().includes(q) || e.ticketId.toLowerCase().includes(q));
  }, [enriched, search]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Entry Logs"
        description="Audit trail of all check-in scans and entries."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin" },
          { label: "Events", href: "/events" },
          { label: "Entry Logs" },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <ScanLine className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Entries</p>
              <p className="text-2xl font-bold">{logs.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Smartphone className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Scan Devices</p>
              <p className="text-2xl font-bold">{uniqueDevices}</p>
            </div>
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gold/10">
              <Clock className="h-6 w-6 text-accent-gold" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Checked In Today</p>
              <p className="text-2xl font-bold">{logs.length}</p>
            </div>
          </div>
        </div>
      </div>

      <SectionSurface>
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or ticket code..." className="w-full rounded-xl border bg-card py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring" />
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-muted/50 p-12 text-center">
            <ScanLine className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">No entry logs found.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">Participant</th>
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">Ticket</th>
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">Scanned At</th>
                  <th className="px-5 py-3 text-left font-medium text-muted-foreground">Device</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((log) => (
                  <tr key={log.id} className="bg-card transition-colors hover:bg-muted/30">
                    <td className="px-5 py-4">
                      <p className="font-medium">{log.participantName}</p>
                      <p className="text-xs text-muted-foreground">{log.participantEmail}</p>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs">{log.ticketId}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(log.scannedAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs font-mono text-muted-foreground">{log.deviceId ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionSurface>
    </div>
  );
}
