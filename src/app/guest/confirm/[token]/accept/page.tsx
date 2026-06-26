import { notFound, redirect } from "next/navigation";
import { getGuestInviteByToken } from "@/features/guests/queries";
import { getEventById } from "@/features/events/queries";
import { AcceptClient } from "./AcceptClient";

export default async function AcceptPage(props: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await props.params;
  const invite = await getGuestInviteByToken(token);

  if (!invite) notFound();

  if (invite.status !== "pending") {
    redirect(`/guest/confirm/${token}`);
  }

  const event = await getEventById(invite.eventId);
  if (!event) notFound();

  return (
    <AcceptClient
      token={token}
      invite={{
        id: invite.id,
        title: invite.title,
        name: invite.name,
        email: invite.email,
        maxCompanions: invite.maxPlusOnes,
      }}
      event={{
        title: event.title,
        startDate: event.startDate,
        venue: event.venue,
      }}
    />
  );
}
