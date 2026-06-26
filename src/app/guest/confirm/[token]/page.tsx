import { notFound } from "next/navigation";
import Link from "next/link";
import { getGuestInviteByToken } from "@/features/guests/queries";
import { getEventById } from "@/features/events/queries";
import { Sparkles } from "lucide-react";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(d: string) {
  return new Date(d).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function GuestConfirmPage(props: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await props.params;
  const invite = await getGuestInviteByToken(token);

  if (!invite) notFound();

  const event = await getEventById(invite.eventId);
  if (!event) notFound();

  if (invite.status === "confirmed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-accent-gold/5 to-white p-6 dark:from-accent-gold/10 dark:to-background">
        <div className="w-full max-w-lg space-y-8 rounded-3xl border bg-card p-10 text-center shadow-lg">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-gold/10 dark:bg-accent-gold/15">
            <Sparkles className="h-10 w-10 text-accent-gold dark:text-accent-gold" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Already Confirmed</h1>
          <p className="text-muted-foreground">
            This invitation has already been confirmed for {event.title}.
          </p>
        </div>
      </div>
    );
  }

  if (invite.status === "declined" || invite.status === "expired") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-stone-50 to-white p-6 dark:from-stone-950/30 dark:to-background">
        <div className="w-full max-w-lg space-y-8 rounded-3xl border bg-card p-10 text-center shadow-lg">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted dark:bg-muted/50">
            <Sparkles className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {invite.status === "expired" ? "Invitation Expired" : "Already Responded"}
          </h1>
          <p className="text-muted-foreground">
            {invite.status === "expired"
              ? "This invitation is no longer valid."
              : "You have already responded to this invitation."}
          </p>
        </div>
      </div>
    );
  }

  const startDate = formatDate(event.startDate);
  const endDate = event.endDate ? formatDate(event.endDate) : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-accent-gold/5 to-white p-6 dark:from-accent-gold/10 dark:to-background">
      <div className="w-full max-w-lg space-y-8 rounded-3xl border bg-card p-10 shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-gold/10 dark:bg-accent-gold/15">
            <Sparkles className="h-10 w-10 text-accent-gold dark:text-accent-gold" />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight">You&apos;re Invited!</h1>
          <p className="mt-2 text-muted-foreground">
            {invite.title ? `${invite.title} ` : ""}{invite.name}, you are cordially invited to <strong>{event.title}</strong>.
          </p>
          {invite.category && (
            <p className="mt-1 text-sm text-muted-foreground">
              {invite.category.name}{invite.organization ? ` · ${invite.organization}` : ""}
            </p>
          )}
        </div>

        <div className="rounded-2xl bg-muted/50 p-5 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Event</span>
            <span className="font-medium">{event.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">{startDate}{endDate && endDate !== startDate ? ` – ${endDate}` : ""}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time</span>
            <span className="font-medium">{formatTime(event.startDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Venue</span>
            <span className="font-medium">{event.venue}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Companions</span>
            <span className="font-medium">Up to {invite.maxPlusOnes}</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href={`/guest/confirm/${token}/accept`}
            className="block w-full rounded-xl bg-accent-gold px-6 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-gold/90"
          >
            Accept Invitation
          </Link>
          <Link
            href={`/guest/confirm/${token}/decline`}
            className="block w-full rounded-xl border bg-card px-6 py-3 text-center text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
          >
            Decline
          </Link>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          This link will expire after you respond.
        </p>
      </div>
    </div>
  );
}
