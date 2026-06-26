"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionSurface } from "@/components/layout/Surface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCheckInStore } from "@/features/check-in/store";
import { getMockGuestInvites } from "@/features/guests/mock";
import { getMockAttendees } from "@/features/check-in/mock";
import type { CheckInEntry } from "@/features/check-in/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  UserCheck, UserX, Search, Camera, CheckCircle2,
  Clock, Users, Undo2, ScanLine, UserPlus,
} from "lucide-react";

type CheckInSource = { sourceType: "guest" | "companion" | "ticket"; sourceId: string };
type ScannablePerson = {
  id: string;
  sourceType: "guest" | "companion" | "ticket";
  sourceId: string;
  name: string;
  category: string;
  zoneId?: string;
  hostName?: string;
};

export default function EventCheckInPage() {
  const params = useParams();
  const eventId = params.eventId as string;

  const { entries, checkIn, undoCheckIn, isCheckedIn } = useCheckInStore();

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("yettoarrive");
  const [scanMode, setScanMode] = useState(false);
  const [scannedResult, setScannedResult] = useState<ScannablePerson | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [manualPayload, setManualPayload] = useState("");
  const [justCheckedInId, setJustCheckedInId] = useState<string | null>(null);
  const [confirmPerson, setConfirmPerson] = useState<ScannablePerson | null>(null);

  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrCodeRef = useRef<any>(null);
  const scannerRunningRef = useRef(false);

  const guests = useMemo(() => getMockGuestInvites(eventId), [eventId]);
  const attendees = useMemo(() => getMockAttendees(eventId), [eventId]);

  const allPeople = useMemo<ScannablePerson[]>(() => {
    const list: ScannablePerson[] = [];
    for (const g of guests) {
      if (g.status === "confirmed" || g.status === "pending") {
        list.push({ id: g.id, sourceType: "guest", sourceId: g.id, name: g.name, category: g.category?.name ?? "Guest", zoneId: g.zoneId });
        for (const c of g.companions ?? []) {
          list.push({ id: c.id, sourceType: "companion", sourceId: c.id, name: c.name, category: `${g.category?.name ?? "Guest"} (Companion)`, zoneId: g.zoneId, hostName: g.name });
        }
      }
    }
    for (const a of attendees) {
      list.push({ id: a.id, sourceType: "ticket", sourceId: a.id, name: a.name, category: a.ticketPackageName, zoneId: undefined });
    }
    return list;
  }, [guests, attendees]);

  const checkedIn = useMemo(() => {
    return entries
      .filter((e) => e.eventId === eventId)
      .sort((a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime());
  }, [entries, eventId]);

  const yetToArrive = useMemo(() => {
    return allPeople.filter((p) => !isCheckedIn(p.sourceType, p.sourceId));
  }, [allPeople, isCheckedIn]);

  const filteredYetToArrive = useMemo(() => {
    if (!search) return yetToArrive;
    const q = search.toLowerCase();
    return yetToArrive.filter((p) => p.name.toLowerCase().includes(q));
  }, [yetToArrive, search]);

  const filteredCheckedIn = useMemo(() => {
    if (!search) return checkedIn;
    const q = search.toLowerCase();
    return checkedIn.filter((e) => e.name.toLowerCase().includes(q));
  }, [checkedIn, search]);

  const findPersonByPayload = useCallback((payload: string): ScannablePerson | null => {
    try {
      const data = JSON.parse(payload);
      if (data.attendeeId) {
        const att = attendees.find((a) => a.id === data.attendeeId);
        if (att) return { id: att.id, sourceType: "ticket", sourceId: att.id, name: att.name, category: att.ticketPackageName };
      }
      if (data.inviteId) {
        const guest = guests.find((g) => g.id === data.inviteId);
        if (data.companionId) {
          const comp = guest?.companions?.find((c) => c.id === data.companionId);
          if (comp) return { id: comp.id, sourceType: "companion", sourceId: comp.id, name: comp.name, category: `${guest?.category?.name ?? "Guest"} (Companion)`, zoneId: guest?.zoneId, hostName: data.hostName ?? guest?.name };
        }
        if (guest) return { id: guest.id, sourceType: "guest", sourceId: guest.id, name: guest.name, category: guest.category?.name ?? "Guest", zoneId: guest.zoneId };
      }
      return null;
    } catch {
      return null;
    }
  }, [guests, attendees]);

  const handleCheckIn = useCallback((person: ScannablePerson) => {
    checkIn({
      eventId,
      sourceType: person.sourceType,
      sourceId: person.sourceId,
      name: person.name,
      category: person.category,
      zoneId: person.zoneId,
    });
    setJustCheckedInId(person.id);
    setScannedResult(null);
    setManualPayload("");
    setTimeout(() => setJustCheckedInId(null), 3000);
  }, [checkIn, eventId]);

  const handleScan = useCallback((decodedText: string) => {
    const person = findPersonByPayload(decodedText);
    if (person) {
      setScannedResult(person);
    } else {
      setScannedResult(null);
    }
    setShowScanner(false);
  }, [findPersonByPayload]);

  const handleManualPayload = useCallback(() => {
    if (!manualPayload) return;
    const person = findPersonByPayload(manualPayload);
    if (person) {
      setScannedResult(person);
    }
  }, [manualPayload, findPersonByPayload]);

  useEffect(() => {
    if (!showScanner || !scannerRef.current) return;

    let stopped = false;

    import("html5-qrcode").then(({ Html5Qrcode }) => {
      if (!showScanner) return;
      const scanner = new Html5Qrcode("qr-reader");
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

  return (
    <div className="space-y-8">
      <PageHeader
        title="Check-in"
        description="Scan QR codes or search by name to check in guests and attendees."
        breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Events", href: "/events" }, { label: "Check-in" }]}
        actions={
          <button
            onClick={() => setShowScanner(!showScanner)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
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
            <div id="qr-reader" ref={scannerRef} className="mx-auto max-w-sm overflow-hidden rounded-2xl bg-black [&_video]:-scale-x-100" />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or paste payload manually</span>
              </div>
            </div>
            <div className="flex gap-3">
              <input
                value={manualPayload}
                onChange={(e) => setManualPayload(e.target.value)}
                placeholder='Paste QR JSON payload, e.g. {&quot;eventId&quot;:&quot;evt_001&quot;,...}'
                className="flex-1 rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring font-mono"
              />
              <button
                onClick={handleManualPayload}
                disabled={!manualPayload}
                className="cursor-pointer rounded-xl bg-accent-gold px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-gold/90 disabled:opacity-50"
              >
                Look Up
              </button>
            </div>
          </div>
        </SectionSurface>
      )}

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
                  {scannedResult.zoneId ? ` · ${scannedResult.zoneId}` : ""}
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
                className="cursor-pointer rounded-xl bg-accent-gold px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-gold/90"
              >
                Check In Now
              </button>
            )}
          </div>
        </SectionSurface>
      )}

      <SectionSurface>
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full rounded-xl border bg-card py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{checkedIn.length} / {allPeople.length} checked in</span>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="yettoarrive" className="gap-2">
              <Clock className="h-4 w-4" />
              Yet to Arrive ({yetToArrive.length})
            </TabsTrigger>
            <TabsTrigger value="checkedin" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Checked In ({checkedIn.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="yettoarrive">
            {filteredYetToArrive.length === 0 ? (
              <div className="rounded-2xl bg-muted/50 p-12 text-center">
                {search ? (
                  <>
                    <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">No matches for &ldquo;{search}&rdquo;</p>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mx-auto mb-3 h-8 w-8 text-accent-gold/50" />
                    <p className="text-sm text-muted-foreground">Everyone has arrived!</p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredYetToArrive.map((person) => {
                  const checked = isCheckedIn(person.sourceType, person.sourceId);
                  const justChecked = justCheckedInId === person.id;
                  return (
                    <div
                      key={person.id}
                      className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                        justChecked ? "border-accent-gold/30 bg-accent-gold/5 dark:border-accent-gold/40 dark:bg-accent-gold/10" : "bg-card"
                      }`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                        {checked ? (
                          <CheckCircle2 className="h-5 w-5 text-accent-gold" />
                        ) : (
                          <UserX className="h-5 w-5 text-muted-foreground/50" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{person.name}</p>
                        <p className="text-xs text-muted-foreground">{person.category}</p>
                      </div>
                      {justChecked ? (
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-accent-gold dark:text-accent-gold">
                          <CheckCircle2 className="h-4 w-4" />
                          Just Checked In
                        </span>
                      ) : !checked ? (
                        <button
                          onClick={() => setConfirmPerson(person)}
                          className="cursor-pointer rounded-xl bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                        >
                          Check In
                        </button>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="checkedin">
            {filteredCheckedIn.length === 0 ? (
              <div className="rounded-2xl bg-muted/50 p-12 text-center">
                {search ? (
                  <>
                    <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">No matches for &ldquo;{search}&rdquo;</p>
                  </>
                ) : (
                  <>
                    <Clock className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">No one has checked in yet.</p>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredCheckedIn.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center gap-4 rounded-2xl border bg-card p-4 transition-all"
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
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <p>{new Date(entry.checkInTime).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</p>
                      <p>{new Date(entry.checkInTime).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                    </div>
                    <button
                      onClick={() => undoCheckIn(entry.id)}
                      className="cursor-pointer rounded-xl border border-border bg-card p-2 text-muted-foreground transition-colors hover:bg-muted"
                      title="Undo check-in"
                    >
                      <Undo2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
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
              className="cursor-pointer rounded-xl border bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={() => { if (confirmPerson) handleCheckIn(confirmPerson); setConfirmPerson(null); }}
              className="cursor-pointer rounded-xl bg-accent-gold px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-gold/90"
            >
              Confirm Check-In
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
