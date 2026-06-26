"use client";

import { useState } from "react";

interface Props {
  token: string;
  invite: {
    id: string;
    name: string;
    email: string;
    maxCompanions: number;
    status: string;
  };
  event: {
    title: string;
    startDate: string;
    endDate: string;
    venue: string;
  };
}

export function RsvpClient({ token, invite, event }: Props) {
  const [response, setResponse] = useState<"accept" | "decline" | null>(null);
  const [companionCount, setCompanionCount] = useState(1);
  const [companions, setCompanions] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (invite.status === "confirmed" || invite.status === "declined") {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-3xl border bg-card p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-gold/10">
            {invite.status === "confirmed" ? (
              <svg className="h-8 w-8 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <h1 className="mb-2 text-2xl font-bold">
            {invite.status === "confirmed" ? "You're Attending!" : "Invitation Declined"}
          </h1>
          <p className="text-muted-foreground">
            {invite.status === "confirmed"
              ? `We look forward to seeing you at ${event.title}.`
              : "You have declined this invitation."}
          </p>
        </div>
      </div>
    );
  }

  if (invite.status === "expired") {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-3xl border bg-card p-8 text-center shadow-lg">
          <h1 className="mb-2 text-2xl font-bold">Invitation Expired</h1>
          <p className="text-muted-foreground">
            This invitation has expired. Please contact the event organizer for assistance.
          </p>
        </div>
      </div>
    );
  }

  const startDate = event.startDate
    ? new Date(event.startDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "TBA";

  const endDate = event.endDate
    ? new Date(event.endDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-3xl border bg-card p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-gold/10">
            <svg className="h-8 w-8 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="mb-2 text-2xl font-bold">Response Recorded</h1>
          <p className="text-muted-foreground">
            {response === "accept"
              ? `Thank you! We look forward to seeing you at ${event.title}.`
              : "We've noted your response. Thank you for letting us know."}
          </p>
          {response === "accept" && invite.maxCompanions > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              {companionCount > 0
                ? `${companionCount} companion${companionCount > 1 ? "s" : ""} will be joining you.`
                : "You chose not to bring any companions."}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-3xl border bg-card shadow-lg">
        <div className="rounded-t-3xl bg-gradient-to-r from-accent-gold to-yellow-600 px-8 py-10 text-center text-white">
          <p className="mb-1 text-sm font-medium uppercase tracking-widest opacity-80">You're Invited</p>
          <h1 className="text-3xl font-bold">{event.title}</h1>
        </div>

        <div className="space-y-6 p-8">
          <div>
            <p className="text-lg font-semibold">Dear {invite.name},</p>
            <p className="mt-2 text-muted-foreground">
              We are honored to invite you as a special guest to <strong>{event.title}</strong>.
              Your presence will make this occasion truly memorable.
            </p>
          </div>

          <div className="rounded-2xl bg-muted/50 p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Event</span>
              <span className="font-medium">{event.title}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">{startDate}{endDate && endDate !== startDate ? ` - ${endDate}` : ""}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Venue</span>
              <span className="font-medium">{event.venue}</span>
            </div>
          </div>

          {response === "accept" && invite.maxCompanions > 0 && (
            <div className="space-y-4 rounded-2xl border p-5">
              <p className="text-sm font-medium">
                Companions
                <span className="ml-1 text-muted-foreground font-normal">
                  (max {invite.maxCompanions})
                </span>
              </p>
              <div>
                <label className="text-sm text-muted-foreground">Number of companions</label>
                <select
                  value={companionCount}
                  onChange={(e) => {
                    const count = Number(e.target.value);
                    setCompanionCount(count);
                    setCompanions((prev) => {
                      const next = [...prev];
                      while (next.length < count) next.push("");
                      return next.slice(0, count);
                    });
                  }}
                  className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
                >
                  {Array.from({ length: invite.maxCompanions + 1 }, (_, i) => (
                    <option key={i} value={i}>{i} {i === 1 ? "companion" : "companions"}</option>
                  ))}
                </select>
              </div>
              {companions.map((_, idx) => (
                <div key={idx}>
                  <label className="text-sm text-muted-foreground">Companion {idx + 1} name</label>
                  <input
                    value={companions[idx] ?? ""}
                    onChange={(e) => {
                      const next = [...companions];
                      next[idx] = e.target.value;
                      setCompanions(next);
                    }}
                    placeholder="e.g. Mary Wanjiku"
                    className="mt-1 w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2">
            {response === null && (
              <>
                <button
                  onClick={() => setResponse("accept")}
                  className="cursor-pointer rounded-xl bg-accent-gold px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-gold/90"
                >
                  Accept Invitation
                </button>
                <button
                  onClick={() => setResponse("decline")}
                  className="cursor-pointer rounded-xl border bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Decline
                </button>
              </>
            )}
            {response !== null && (
              <div className="space-y-3">
                <p className="text-center text-sm text-muted-foreground">
                  {response === "accept" ? "You're accepting this invitation." : "You're declining this invitation."}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setResponse(null)}
                    className="flex-1 cursor-pointer rounded-xl border bg-card px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex-1 cursor-pointer rounded-xl bg-accent-gold px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-gold/90 disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Confirm"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
