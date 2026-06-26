"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { useCheckInStore } from "@/features/check-in/store";
import { MOCK_ATTENDEES } from "@/features/check-in/mock";
import { MOCK_GUEST_INVITES } from "@/features/guests/mock";
import { MOCK_EDITIONS } from "@/features/events/mock";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Camera, ScanLine, UserCheck, UserX,
  CheckCircle2, Undo2, UserPlus, Calendar, Search,
} from "lucide-react";

interface ScannedPerson {
  id: string;
  eventId: string;
  eventName: string;
  sourceType: "guest" | "companion" | "ticket";
  sourceId: string;
  name: string;
  category: string;
  zoneId?: string;
  hostName?: string;
}

const EVENT_NAMES = Object.fromEntries(
  MOCK_EDITIONS.map((e) => [e.id, e.title])
);

function findPerson(payload: string): ScannedPerson | null {
  try {
    const data = JSON.parse(payload);
    const eventId: string = data.eventId;
    if (!eventId) return null;

    const eventName = EVENT_NAMES[eventId] ?? `Event ${eventId}`;

    if (data.attendeeId) {
      const att = MOCK_ATTENDEES.find((a) => a.id === data.attendeeId);
      if (att) {
        return {
          id: att.id,
          eventId,
          eventName,
          sourceType: "ticket",
          sourceId: att.id,
          name: att.name,
          category: att.ticketPackageName,
        };
      }
    }

    if (data.inviteId) {
      const guest = MOCK_GUEST_INVITES.find((g) => g.id === data.inviteId);
      if (data.companionId) {
        const comp = guest?.companions?.find((c) => c.id === data.companionId);
        if (comp) {
          return {
            id: comp.id,
            eventId,
            eventName,
            sourceType: "companion",
            sourceId: comp.id,
            name: comp.name,
            category: `${guest?.category?.name ?? "Guest"} (Companion)`,
            zoneId: guest?.zoneId,
            hostName: data.hostName ?? guest?.name,
          };
        }
      }
      if (guest) {
        return {
          id: guest.id,
          eventId,
          eventName,
          sourceType: "guest",
          sourceId: guest.id,
          name: guest.name,
          category: guest.category?.name ?? "Guest",
          zoneId: guest.zoneId,
        };
      }
    }

    return null;
  } catch {
    return null;
  }
}

function buildPeopleByEvent(): Map<string, ScannedPerson[]> {
  const map = new Map<string, ScannedPerson[]>();

  for (const edition of MOCK_EDITIONS) {
    const eventId = edition.id;
    const eventName = edition.title;
    const list: ScannedPerson[] = [];

    for (const att of MOCK_ATTENDEES.filter((a) => a.eventId === eventId)) {
      list.push({
        id: att.id,
        eventId,
        eventName,
        sourceType: "ticket",
        sourceId: att.id,
        name: att.name,
        category: att.ticketPackageName,
      });
    }

    for (const guest of MOCK_GUEST_INVITES.filter((g) => g.eventId === eventId)) {
      if (guest.status === "confirmed" || guest.status === "pending") {
        list.push({
          id: guest.id,
          eventId,
          eventName,
          sourceType: "guest",
          sourceId: guest.id,
          name: guest.name,
          category: guest.category?.name ?? "Guest",
          zoneId: guest.zoneId,
        });
        for (const comp of guest.companions ?? []) {
          list.push({
            id: comp.id,
            eventId,
            eventName,
            sourceType: "companion",
            sourceId: comp.id,
            name: comp.name,
            category: `${guest.category?.name ?? "Guest"} (Companion)`,
            zoneId: guest.zoneId,
            hostName: guest.name,
          });
        }
      }
    }

    map.set(eventId, list);
  }

  return map;
}

const PEOPLE_BY_EVENT = buildPeopleByEvent();

export default function AdminCheckInPage() {
  const { entries, checkIn, undoCheckIn, isCheckedIn } = useCheckInStore();

  const [showScanner, setShowScanner] = useState(false);
  const [scannedResult, setScannedResult] = useState<ScannedPerson | null>(null);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmPerson, setConfirmPerson] = useState<ScannedPerson | null>(null);
  const [justCheckedInId, setJustCheckedInId] = useState<string | null>(null);

  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<any>(null);
  const scannerRunningRef = useRef(false);

  const handleScan = useCallback((decodedText: string) => {
    const person = findPerson(decodedText);
    setScannedResult(person);
    setShowScanner(false);
  }, []);

  const handleSelectPerson = useCallback((person: ScannedPerson) => {
    setScannedResult(person);
    setSearchQuery("");
  }, []);

  const handleCheckIn = useCallback((person: ScannedPerson) => {
    checkIn({
      eventId: person.eventId,
      sourceType: person.sourceType,
      sourceId: person.sourceId,
      name: person.name,
      category: person.category,
      zoneId: person.zoneId,
    });
    setJustCheckedInId(person.id);
    setScannedResult(null);
    setTimeout(() => setJustCheckedInId(null), 3000);
  }, [checkIn]);

  const eventPeople = selectedEventId ? PEOPLE_BY_EVENT.get(selectedEventId) ?? [] : [];
  const searchResults = searchQuery.trim()
    ? eventPeople.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (!showScanner || !scannerRef.current) return;

    let stopped = false;

    import("html5-qrcode").then(({ Html5Qrcode }) => {
      if (!showScanner) return;
      const scanner = new Html5Qrcode("qr-reader-staff");
      html5QrCodeRef.current = scanner;
      scannerRunningRef.current = true;

      scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          stopped = true;
          scannerRunningRef.current = false;
          handleScan(decodedText);
          scanner.stop().then(() => {
            html5QrCodeRef.current = null;
          }).catch(() => {
            html5QrCodeRef.current = null;
          });
        },
        () => {},
      ).catch(() => {});
    });

    return () => {
      if (!stopped && html5QrCodeRef.current && scannerRunningRef.current) {
        scannerRunningRef.current = false;
        html5QrCodeRef.current.stop().catch(() => {});
        html5QrCodeRef.current = null;
      }
    };
  }, [showScanner, handleScan]);

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime()
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Check-in"
        description="Scan QR codes to check in guests and attendees across all events."
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Check-in" }]}
        actions={
          <button
            onClick={() => setShowScanner(!showScanner)}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Camera className="h-4 w-4" />
            {showScanner ? "Close Scanner" : "Scan QR"}
          </button>
        }
      />

      {showScanner && (
        <SectionSurface>
          <div className="space-y-4">
            <h3 className="text-lg font-bold tracking-tight">QR Scanner</h3>
            <p className="text-sm text-muted-foreground">
              Point the camera at a QR code to look up the attendee across all events.
            </p>
            <div id="qr-reader-staff" ref={scannerRef} className="mx-auto max-w-sm overflow-hidden rounded-2xl bg-black [&_video]:-scale-x-100" />
          </div>
        </SectionSurface>
      )}

      {scannedResult === null && showScanner && (
        <SectionSurface>
          <div className="flex items-center gap-4 rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
              <UserX className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="font-semibold text-destructive">Person not found</p>
              <p className="text-sm text-muted-foreground">
                No matching attendee or guest found for this QR code.
              </p>
            </div>
          </div>
        </SectionSurface>
      )}

      <SectionSurface>
        <div className="space-y-4">
          <h3 className="text-lg font-bold tracking-tight">Search by Name</h3>
          <p className="text-sm text-muted-foreground">
            Select an event, then search for a person by name to check them in.
          </p>

          <select
            value={selectedEventId}
            onChange={(e) => { setSelectedEventId(e.target.value); setSearchQuery(""); }}
            className="w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
          >
            <option value="">Select an event…</option>
            {MOCK_EDITIONS.filter((e) => e.status === "PUBLISHED" || e.status === "ONGOING").map((e) => (
              <option key={e.id} value={e.id}>{e.title}</option>
            ))}
          </select>

          {selectedEventId && (
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name…"
                className="w-full rounded-xl border bg-card py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="max-h-72 space-y-1 overflow-y-auto rounded-2xl border bg-card p-2">
              {searchResults.map((person) => {
                const checked = isCheckedIn(person.sourceType, person.sourceId);
                return (
                  <button
                    key={`${person.sourceType}-${person.sourceId}`}
                    onClick={() => handleSelectPerson(person)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted"
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      checked ? "bg-accent-gold/10" : "bg-muted"
                    }`}>
                      {checked
                        ? <CheckCircle2 className="h-4 w-4 text-accent-gold" />
                        : <UserX className="h-4 w-4 text-muted-foreground/50" />
                      }
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{person.name}</p>
                      <p className="text-xs text-muted-foreground">{person.category}</p>
                    </div>
                    {checked && (
                      <span className="text-xs font-medium text-accent-gold">Checked In</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {searchQuery.trim() && searchResults.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No matches for &ldquo;{searchQuery}&rdquo;
            </p>
          )}
        </div>
      </SectionSurface>

      {scannedResult && (
        <SectionSurface>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-gold/10 dark:bg-accent-gold/15">
                <ScanLine className="h-7 w-7 text-accent-gold dark:text-accent-gold" />
              </div>
              <div>
                <p className="text-lg font-bold">{scannedResult.name}</p>
                <p className="text-sm text-muted-foreground">
                  {scannedResult.category}
                  {scannedResult.hostName ? ` · Guest: ${scannedResult.hostName}` : ""}
                </p>
                <p className="flex items-center gap-1.5 text-xs font-medium text-accent-gold mt-0.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {scannedResult.eventName}
                </p>
              </div>
            </div>
            {isCheckedIn(scannedResult.sourceType, scannedResult.sourceId) ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-gold/10 px-3 py-1.5 text-sm font-medium text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold">
                <CheckCircle2 className="h-4 w-4" />
                Already Checked In
              </span>
            ) : (
              <button
                onClick={() => setConfirmPerson(scannedResult)}
                className="rounded-xl bg-accent-gold px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-gold/90 cursor-pointer"
              >
                Check In Now
              </button>
            )}
          </div>
        </SectionSurface>
      )}

      <SectionSurface>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Recent Check-ins ({sortedEntries.length})
          </h3>
        </div>

        {sortedEntries.length === 0 ? (
          <div className="rounded-2xl bg-muted/50 p-12 text-center">
            <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-accent-gold/50" />
            <p className="text-sm text-muted-foreground">No check-ins recorded yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {sortedEntries.map((entry) => {
              const eventName = EVENT_NAMES[entry.eventId] ?? entry.eventId;
              return (
                <div
                  key={entry.id}
                  className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                    justCheckedInId === entry.sourceId
                      ? "border-accent-gold/30 bg-accent-gold/5 dark:border-accent-gold/40 dark:bg-accent-gold/10"
                      : "bg-card"
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10 dark:bg-accent-gold/15">
                    <UserCheck className="h-5 w-5 text-accent-gold dark:text-accent-gold" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{entry.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {entry.category ?? entry.sourceType}
                      {entry.zoneId ? ` · ${entry.zoneId}` : ""}
                    </p>
                    <p className="flex items-center gap-1 text-[11px] text-accent-gold/80 mt-0.5">
                      <Calendar className="h-3 w-3" />
                      {eventName}
                    </p>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <p>{new Date(entry.checkInTime).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</p>
                    <p>{new Date(entry.checkInTime).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                  </div>
                  <button
                    onClick={() => undoCheckIn(entry.id)}
                    className="rounded-xl border border-border bg-card p-2 text-muted-foreground transition-colors hover:bg-muted"
                    title="Undo check-in"
                  >
                    <Undo2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </SectionSurface>

      <Dialog open={!!confirmPerson} onOpenChange={(o) => { if (!o) setConfirmPerson(null); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Check-In</DialogTitle>
          </DialogHeader>

          {confirmPerson && (
            <div className="space-y-5">
              <div className="flex items-center gap-4 rounded-2xl border bg-card p-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-gold/10 dark:bg-accent-gold/15">
                  <UserPlus className="h-7 w-7 text-accent-gold dark:text-accent-gold" />
                </div>
                <div>
                  <p className="text-lg font-bold">{confirmPerson.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {confirmPerson.category}
                    {confirmPerson.hostName ? ` · Guest: ${confirmPerson.hostName}` : ""}
                  </p>
                  <p className="flex items-center gap-1.5 text-xs font-medium text-accent-gold mt-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {confirmPerson.eventName}
                  </p>
                  {confirmPerson.zoneId && (
                    <p className="text-xs text-muted-foreground">Zone: {confirmPerson.zoneId}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <button
              onClick={() => setConfirmPerson(null)}
              className="rounded-xl border bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={() => { if (confirmPerson) handleCheckIn(confirmPerson); setConfirmPerson(null); }}
              className="rounded-xl bg-accent-gold px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-gold/90"
            >
              Confirm Check-In
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
