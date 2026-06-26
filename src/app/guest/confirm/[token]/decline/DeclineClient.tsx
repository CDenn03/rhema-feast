"use client";

import { useState } from "react";
import Link from "next/link";
import { XCircle } from "lucide-react";
import { respondToInviteAction } from "@/features/guests/actions";

interface Props {
  token: string;
  eventTitle: string;
  name: string;
  title: string;
}

export function DeclineClient({ token, eventTitle, name, title }: Props) {
  const guestFullName = title ? `${title} ${name}` : name;
  const [step, setStep] = useState<"form" | "submitting" | "done">("form");
  const [error, setError] = useState("");

  if (step === "done") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-stone-50 to-white p-6 dark:from-stone-950/30 dark:to-background">
        <div className="w-full max-w-lg space-y-8 rounded-3xl border bg-card p-10 text-center shadow-lg">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted dark:bg-muted/50">
            <XCircle className="h-10 w-10 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Response Recorded</h1>
            <p className="mt-2 text-muted-foreground">
              Thank you for letting us know, <strong>{guestFullName}</strong>. We hope you can join us at a future event.
            </p>
          </div>
          <div className="rounded-2xl bg-muted/50 p-4 text-sm text-muted-foreground">
            If this was a mistake, please contact the event organizer.
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
    formData.set("response", "decline");
    formData.set("companionNames", "[]");
    const result = await respondToInviteAction(formData);
    if (result.success) {
      setStep("done");
    } else {
      setError(result.error ?? "Something went wrong.");
      setStep("form");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-stone-50 to-white p-6 dark:from-stone-950/30 dark:to-background">
      <div className="w-full max-w-lg space-y-8 rounded-3xl border bg-card p-10 shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted dark:bg-muted/50">
            <XCircle className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight">Decline Invitation</h1>
          <p className="mt-2 text-muted-foreground">
            We&apos;re sorry you won&apos;t be able to make it to <strong>{eventTitle}</strong>.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to decline? If your plans change later, please contact the event organizer.
        </p>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="space-y-3">
          <button
            onClick={handleSubmit}
            disabled={step === "submitting"}
            className="w-full rounded-xl border bg-card px-6 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
          >
            {step === "submitting" ? "Confirming..." : "Yes, I Can't Attend"}
          </button>
          <Link
            href={`/guest/confirm/${token}/accept`}
            className="block w-full text-center text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            Accept instead
          </Link>
        </div>
      </div>
    </div>
  );
}
