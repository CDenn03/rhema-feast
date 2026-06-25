import { notFound } from "next/navigation";
import { getGuestInviteByToken } from "@/features/guests/queries";
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";

export default async function GuestConfirmPage(props: { params: Promise<{ token: string }> }) {
  const { token } = await props.params;
  const invite = await getGuestInviteByToken(token);

  if (!invite) notFound();

  const eventName = "Rhema Feast 2026";

  if (invite.status === "confirmed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-accent-gold/5 to-white p-6 dark:from-accent-gold/10 dark:to-background">
        <div className="w-full max-w-lg space-y-8 rounded-3xl border bg-card p-10 text-center shadow-lg">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-gold/10 dark:bg-accent-gold/15">
            <CheckCircle className="h-10 w-10 text-accent-gold dark:text-accent-gold" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Already Confirmed</h1>
            <p className="mt-2 text-muted-foreground">
              This invitation has already been confirmed for {eventName}. Please check your email for your QR codes.
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            Need to update your details? Contact the event organizer.
          </p>
        </div>
      </div>
    );
  }

  if (invite.status === "declined") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-muted/30 to-white p-6 dark:from-muted/10 dark:to-background">
        <div className="w-full max-w-lg space-y-8 rounded-3xl border bg-card p-10 text-center shadow-lg">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted dark:bg-muted/50">
            <XCircle className="h-10 w-10 text-muted-foreground dark:text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Invitation Declined</h1>
            <p className="mt-2 text-muted-foreground">
              You have previously declined this invitation for {eventName}. If this was a mistake, please contact the organizer.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (invite.status === "expired") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white p-6 dark:from-gray-950/30 dark:to-background">
        <div className="w-full max-w-lg space-y-8 rounded-3xl border bg-card p-10 text-center shadow-lg">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <Clock className="h-10 w-10 text-gray-500 dark:text-gray-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Invitation Expired</h1>
            <p className="mt-2 text-muted-foreground">
              This invitation for {eventName} is no longer valid. Please contact the organizer to receive a new invitation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-accent-gold/5 to-white p-6 dark:from-accent-gold/10 dark:to-background">
      <div className="w-full max-w-lg space-y-8 rounded-3xl border bg-card p-10 shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-gold/10 dark:bg-accent-gold/15">
            <AlertTriangle className="h-10 w-10 text-accent-gold dark:text-accent-gold" />
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight">You&apos;re Invited!</h1>
          <p className="mt-2 text-muted-foreground">
            {invite.name}, you are cordially invited to <strong>{eventName}</strong>.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {invite.category?.name} · {invite.organization}
          </p>
        </div>

        <div className="rounded-2xl bg-muted/50 p-6">
          <p className="text-sm font-medium">Please confirm your attendance</p>
          <p className="mt-1 text-xs text-muted-foreground">
            You can bring up to {invite.maxPlusOnes} companion{invite.maxPlusOnes !== 1 ? "s" : ""}.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Companion Names</label>
            <input
              placeholder="Companion name 1"
              className="w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
            />
            {Array.from({ length: Math.max(0, invite.maxPlusOnes - 1) }).map((_, i) => (
              <input
                key={i}
                placeholder={`Companion name ${i + 2}`}
                className="w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button className="flex-1 rounded-xl bg-accent-gold px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-gold/90">
              Confirm Attendance
            </button>
            <button className="flex-1 rounded-xl border bg-card px-6 py-3 text-sm font-medium transition-colors hover:bg-muted">
              Decline
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          This invitation expires on {invite.expiresAt ? new Date(invite.expiresAt).toLocaleDateString() : "N/A"}.
        </p>
      </div>
    </div>
  );
}
