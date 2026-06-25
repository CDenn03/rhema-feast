import { getGuestInvites, getGuestCategories } from "@/features/guests/queries";
import { getEventById } from "@/features/events/queries";
import { GuestsPageClient } from "./_components/GuestsPageClient";

export default async function EventGuestsPage(props: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await props.params;
  const [invites, categories, event] = await Promise.all([
    getGuestInvites(eventId),
    getGuestCategories(),
    getEventById(eventId),
  ]);

  return (
    <GuestsPageClient
      eventId={eventId}
      eventName={event?.title ?? "Event"}
      invites={invites}
      categories={categories}
      guestInvitesEnabled={event?.guestInvitesEnabled ?? false}
    />
  );
}
