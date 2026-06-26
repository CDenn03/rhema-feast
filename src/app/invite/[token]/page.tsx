import { notFound } from "next/navigation";
import { getGuestInviteByToken } from "@/features/guests/queries";
import { getEventById } from "@/features/events/queries";
import { RsvpClient } from "./RsvpClient";

export default async function InvitePage(props: { params: Promise<{ token: string }> }) {
  const { token } = await props.params;
  const invite = await getGuestInviteByToken(token);

  if (!invite) {
    notFound();
  }

  const event = await getEventById(invite.eventId);
  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 dark:from-stone-950 dark:to-stone-900">
      <RsvpClient
        token={token}
        invite={{
          id: invite.id,
          name: invite.name,
          email: invite.email,
          maxCompanions: invite.maxPlusOnes,
          status: invite.status,
        }}
        event={{
          title: event.title,
          startDate: event.startDate,
          endDate: event.endDate,
          venue: event.venue,
        }}
      />
    </div>
  );
}
