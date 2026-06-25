import type { Event, AgendaSession, EventPartner } from "./types";
import type { PaginatedResult } from "@/types";

const MOCK_AGENDA: AgendaSession[] = [
  { id: "as_001", title: "Opening Ceremony & Worship", description: "Welcome address and praise and worship session.", startTime: "2026-08-31T09:00:00Z", endTime: "2026-08-31T10:30:00Z", speaker: "Pastor John Kamau", location: "Main Auditorium" },
  { id: "as_002", title: "Keynote: Faith in the Modern World", description: "A powerful message on living out faith in today's context.", startTime: "2026-08-31T11:00:00Z", endTime: "2026-08-31T12:30:00Z", speaker: "Bishop David Mwangi", location: "Main Auditorium" },
  { id: "as_003", title: "Workshop: Prayer & Intercession", description: "Practical workshop on effective prayer and intercession.", startTime: "2026-09-01T09:00:00Z", endTime: "2026-09-01T11:00:00Z", speaker: "Minister Grace Akinyi", location: "Hall B" },
  { id: "as_004", title: "Youth Empowerment Session", description: "Addressing the unique challenges facing young believers.", startTime: "2026-09-01T14:00:00Z", endTime: "2026-09-01T16:00:00Z", speaker: "Dr. James Ochieng", location: "Youth Centre" },
  { id: "as_005", title: "Closing Ceremony & Communion", description: "Final gathering with communion and benediction.", startTime: "2026-09-04T15:00:00Z", endTime: "2026-09-04T18:00:00Z", speaker: "Bishop David Mwangi", location: "Main Auditorium" },
];

const MOCK_PARTNERS: EventPartner[] = [
  { id: "ep_001", name: "Safaricom PLC", type: "SPONSOR" },
  { id: "ep_002", name: "Hope TV", type: "MEDIA" },
  { id: "ep_003", name: "African Leadership Institute", type: "SPONSOR" },
  { id: "ep_004", name: "Nation Media Group", type: "MEDIA" },
];

const MOCK_EVENTS: Event[] = [
  {
    id: "evt_001",
    slug: "rhema-feast-2026",
    title: "Rhema Feast",
    description:
      "A five-day gathering of worship, teaching, and fellowship. Join us for an atmosphere of faith, prayer, and the Word.",
    status: "PUBLISHED",
    startDate: "2026-08-31T09:00:00Z",
    endDate: "2026-09-04T18:00:00Z",
    venue: "Rhema Christian Centre, Nairobi",
    capacity: 3000,
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-06-15T14:30:00Z",
    guestInvitesEnabled: true,
    defaultPlusOneCount: 2,
    inviteExpiryHours: 168,
    agenda: MOCK_AGENDA,
    partners: MOCK_PARTNERS,
  },
  {
    id: "evt_002",
    slug: "rhema-business-2026",
    title: "Rhema Business",
    description:
      "A day of equipping marketplace leaders with biblical principles for business, finance, and entrepreneurship.",
    status: "PUBLISHED",
    startDate: "2026-09-03T08:00:00Z",
    endDate: "2026-09-03T17:00:00Z",
    venue: "Rhema Christian Centre, Nairobi",
    capacity: 500,
    createdAt: "2026-03-15T08:00:00Z",
    updatedAt: "2026-06-10T16:45:00Z",
    guestInvitesEnabled: false,
    defaultPlusOneCount: 1,
    inviteExpiryHours: 72,
  },
];

export async function getMockPublicEvents(): Promise<PaginatedResult<Event>> {
  const published = MOCK_EVENTS.filter((e) => e.status === "PUBLISHED" || e.status === "ONGOING");
  return {
    data: published,
    total: published.length,
    page: 1,
    pageSize: 12,
    totalPages: 1,
  };
}

export async function getMockDashboardEvents(): Promise<PaginatedResult<Event>> {
  return {
    data: MOCK_EVENTS,
    total: MOCK_EVENTS.length,
    page: 1,
    pageSize: 20,
    totalPages: 1,
  };
}

export async function getMockEventById(id: string): Promise<Event | null> {
  return MOCK_EVENTS.find((e) => e.id === id) ?? null;
}
