"use client";

import { useState } from "react";
import Link from "next/link";
import { PartyPopper, Sparkles } from "lucide-react";
import { respondToInviteAction } from "@/features/guests/actions";

interface Props {
  token: string;
  invite: {
    id: string;
    title: string;
    name: string;
    email: string;
    maxCompanions: number;
  };
  event: {
    title: string;
    startDate: string;
    venue: string;
  };
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function AcceptClient({ token, invite, event }: Props) {
  const guestFullName = invite.title ? `${invite.title} ${invite.name}` : invite.name;
  const [step, setStep] = useState<"form" | "submitting" | "done">("form");
  const [companionCount, setCompanionCount] = useState(0);
  const [companions, setCompanions] = useState<string[]>([]);
  const [error, setError] = useState("");

  if (step === "done") {
    const startDate = formatDate(event.startDate);
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-accent-gold/5 to-white p-6 dark:from-accent-gold/10 dark:to-background">
        <div className="w-full max-w-lg space-y-8 rounded-3xl border bg-card p-10 text-center shadow-lg">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-gold/10 dark:bg-accent-gold/15">
            <PartyPopper className="h-10 w-10 text-accent-gold dark:text-accent-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">See You There!</h1>
            <p className="mt-2 text-muted-foreground">
              Thank you, <strong>{guestFullName}</strong>! We look forward to seeing you at{" "}
              <strong>{event.title}</strong>.
            </p>
          </div>
          <div className="rounded-2xl bg-muted/50 p-5 space-y-2 text-left text-sm">
            <p className="font-medium text-accent-gold">Event Details</p>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">{startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Venue</span>
              <span className="font-medium">{event.venue}</span>
            </div>
          </div>
          {companions.filter(Boolean).length > 0 && (
            <div className="rounded-2xl bg-muted/50 p-4 text-left text-sm">
              <p className="mb-2 font-medium">Companions joining you:</p>
              <ul className="space-y-1">
                {companions.filter(Boolean).map((name, i) => (
                  <li key={i} className="text-muted-foreground">• {name}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-2xl border border-accent-gold/20 bg-accent-gold/5 p-4 text-sm">
            <p className="font-medium text-accent-gold">Your QR Code</p>
            <p className="mt-1 text-muted-foreground">
              Your QR code will be sent to <strong>{invite.email}</strong>. Show it at the entrance for check-in.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    setStep("submitting");
    setError("");
    const formData = new FormData();
    formData.set("token", token);
    formData.set("response", "accept");
    formData.set("companionNames", JSON.stringify(companions.filter(Boolean)));
    const result = await respondToInviteAction(formData);
    if (result.success) {
      setStep("done");
    } else {
      setError(result.error ?? "Something went wrong.");
      setStep("form");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-accent-gold/5 to-white p-6 dark:from-accent-gold/10 dark:to-background">
      <div className="w-full max-w-lg space-y-8 rounded-3xl border bg-card p-10 shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-gold/10 dark:bg-accent-gold/15">
            <Sparkles className="h-10 w-10 text-accent-gold dark:text-accent-gold" />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight">Confirm Attendance</h1>
          <p className="mt-2 text-muted-foreground">
            <strong>{guestFullName}</strong>, tell us about any companions joining you at{" "}
            <strong>{event.title}</strong>.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <p className="mb-2 text-sm font-medium">
              Companions
              <span className="ml-1 font-normal text-muted-foreground">
                (max {invite.maxCompanions})
              </span>
            </p>
            <div className="flex gap-2">
              {Array.from({ length: invite.maxCompanions + 1 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setCompanionCount(i);
                    setCompanions((prev) => {
                      const next = [...prev];
                      while (next.length < i) next.push("");
                      return next.slice(0, i);
                    });
                  }}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                    companionCount === i
                      ? "border-accent-gold bg-accent-gold/10 text-accent-gold"
                      : "bg-card text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>

          {companionCount > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Companion{companionCount > 1 ? "s" : ""}
              </label>
              {companions.map((_, idx) => (
                <input
                  key={idx}
                  value={companions[idx] ?? ""}
                  onChange={(e) => {
                    const next = [...companions];
                    next[idx] = e.target.value;
                    setCompanions(next);
                  }}
                  placeholder={`Companion ${idx + 1} name`}
                  className="w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
                />
              ))}
            </div>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="space-y-3">
            <button
              onClick={handleSubmit}
              disabled={step === "submitting"}
              className="w-full rounded-xl bg-accent-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-gold/90 disabled:opacity-50"
            >
              {step === "submitting" ? "Confirming..." : "Yes, I'll Be There"}
            </button>
            <Link
              href={`/guest/confirm/${token}/decline`}
              className="block w-full text-center text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Decline instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
