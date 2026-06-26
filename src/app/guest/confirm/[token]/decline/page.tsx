import { notFound, redirect } from "next/navigation";
import { getGuestInviteByToken } from "@/features/guests/queries";
import { getEventById } from "@/features/events/queries";
import { DeclineClient } from "./DeclineClient";

export default async function DeclinePage(props: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await props.params;
  const invite = await getGuestInviteByToken(token);

  if (!invite) notFound();

  if (invite.status !== "pending") {
    redirect(`/guest/confirm/${token}`);
  }

  const event = await getEventById(invite.eventId);

  return (
    <DeclineClient
      token={token}
      eventTitle={event?.title ?? "this event"}
      name={invite.name}
      title={invite.title}
    />
  );
}
