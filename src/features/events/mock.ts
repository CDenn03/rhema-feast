import type { EventSeries, EventEdition, SubEvent, AgendaSession, EventPartner } from "./types";
import type { PaginatedResult } from "@/types";

const MOCK_AGENDA: AgendaSession[] = [
  { id: "as_001", title: "Opening Ceremony & Worship", description: "Welcome address and praise and worship session.", startTime: "2026-08-31T09:00:00Z", endTime: "2026-08-31T10:30:00Z", speaker: "Reverend Julian Kyula", location: "Main Pavilion, Uhuru Park" },
  { id: "as_002", title: "Keynote: Apostolic Grace", description: "A powerful message on apostolic mandate for the nations.", startTime: "2026-08-31T11:00:00Z", endTime: "2026-08-31T12:30:00Z", speaker: "Apostle Joshua Selman", location: "Main Pavilion, Uhuru Park" },
  { id: "as_003", title: "Workshop: Prayer & Intercession", description: "Practical workshop on effective prayer and prophetic intercession.", startTime: "2026-09-01T09:00:00Z", endTime: "2026-09-01T11:00:00Z", speaker: "Apostle William Kimani", location: "Prayer Tent, Uhuru Park" },
  { id: "as_004", title: "Worship Seminar", description: "Understanding the dynamics of authentic worship.", startTime: "2026-09-01T14:00:00Z", endTime: "2026-09-01T16:00:00Z", speaker: "Pastor Nathaniel Bassey", location: "Worship Pavilion, Uhuru Park" },
  { id: "as_005", title: "Closing Ceremony & Communion", description: "Final gathering with communion and benediction.", startTime: "2026-09-04T15:00:00Z", endTime: "2026-09-04T18:00:00Z", speaker: "Reverend Julian Kyula", location: "Main Pavilion, Uhuru Park" },
];

const MOCK_PARTNERS: EventPartner[] = [
  { id: "ep_001", name: "Safaricom PLC", type: "SPONSOR" },
  { id: "ep_002", name: "Hope TV", type: "MEDIA" },
  { id: "ep_003", name: "African Leadership Institute", type: "SPONSOR" },
  { id: "ep_004", name: "Nation Media Group", type: "MEDIA" },
];

const MOCK_AGENDA_BUSINESS: AgendaSession[] = [
  { id: "as_b001", title: "Registration & Networking", description: "Check-in and morning networking over coffee.", startTime: "2026-08-31T08:00:00Z", endTime: "2026-08-31T09:00:00Z", speaker: "MC", location: "Business Forum Tents, Uhuru Park Gardens" },
  { id: "as_b002", title: "Keynote: Kingdom Economics", description: "Strategic deployment of Kingdom wealth and economic structural design.", startTime: "2026-08-31T09:00:00Z", endTime: "2026-08-31T11:00:00Z", speaker: "Reverend Julian Kyula", location: "Business Forum Tents, Uhuru Park Gardens" },
  { id: "as_b003", title: "Socio-Economic Systems Penetration", description: "How to penetrate and transform socio-economic systems with Kingdom principles.", startTime: "2026-08-31T11:30:00Z", endTime: "2026-08-31T13:00:00Z", speaker: "Apostle Joshua Selman", location: "Business Forum Tents, Uhuru Park Gardens" },
  { id: "as_b004", title: "Organizational Leadership & Succession", description: "Maintaining deep spiritual competency while leading global institutions.", startTime: "2026-08-31T14:00:00Z", endTime: "2026-08-31T16:00:00Z", speaker: "Bishop J.B. Masinde", location: "Business Forum Tents, Uhuru Park Gardens" },
  { id: "as_b005", title: "Kingdom Finance & Wealth Deployment", description: "Strategic deployment of Kingdom wealth for marketplace impact.", startTime: "2026-08-31T16:30:00Z", endTime: "2026-08-31T19:00:00Z", speaker: "Panel Session", location: "Business Forum Tents, Uhuru Park Gardens" },
];

const MOCK_AGENDA_KIDS: AgendaSession[] = [
  { id: "as_k001", title: "Kids Praise & Worship", description: "Fun praise and worship session for children.", startTime: "2026-08-31T09:00:00Z", endTime: "2026-08-31T10:00:00Z", speaker: "Children's Ministry Team", location: "Children's Hall" },
  { id: "as_k002", title: "Bible Stories & Crafts", description: "Interactive Bible stories and craft activities.", startTime: "2026-08-31T10:30:00Z", endTime: "2026-08-31T12:00:00Z", speaker: "Teacher Grace", location: "Children's Hall" },
];

const MOCK_PARTNERS_BUSINESS: EventPartner[] = [
  { id: "ep_b001", name: "KCB Bank", type: "SPONSOR" },
  { id: "ep_b002", name: "Business Daily", type: "MEDIA" },
];

export const MOCK_SERIES: EventSeries[] = [
  {
    id: "ser_001",
    title: "Rhema Feast",
    slug: "rhema-feast",
    description: "An Apostolic movement sharing the unadulterated and authentic word of God to the nations and to all generations.",
    recurrence: "annual",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-03-01T10:00:00Z",
    editionCount: 3,
  },
  {
    id: "ser_002",
    title: "Rhema Fellowship",
    slug: "rhema-fellowship",
    description: "Weekly fellowship gathering every Sunday.",
    recurrence: "weekly",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2026-06-01T10:00:00Z",
    editionCount: 1,
  },
];

export const MOCK_EDITIONS: EventEdition[] = [
  {
    id: "evt_001",
    seriesId: "ser_001",
    seriesTitle: "Rhema Feast",
    year: "2026",
    slug: "rhema-feast-2026",
    title: "Rhema Feast 2026",
    description:
      "An apostolic gathering at Uhuru Park, Nairobi. An opportune window to apprehend the intangible: graces, mantles, and above all, God Himself.",
    status: "PUBLISHED",
    startDate: "2026-08-31T09:00:00Z",
    endDate: "2026-09-04T18:00:00Z",
    venue: "Uhuru Park, Nairobi",
    capacity: 10000,
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-06-15T14:30:00Z",
    guestInvitesEnabled: true,
    defaultPlusOneCount: 2,
    inviteExpiryHours: 168,
    agenda: MOCK_AGENDA,
    partners: MOCK_PARTNERS,
    subEvents: [
      {
        id: "sub_001",
        editionId: "evt_001",
        type: "main",
        title: "Rhema Feast Main",
        slug: "rhema-feast-2026-main",
        description: "Main apostolic gathering with worship, teaching, and communion at Uhuru Park.",
        capacity: 10000,
        price: 0,
        isPaid: false,
        requiresTicket: true,
        startDate: "2026-08-31T09:00:00Z",
        endDate: "2026-09-04T18:00:00Z",
        venue: "Main Pavilion, Uhuru Park",
        status: "PUBLISHED",
      },
      {
        id: "sub_002",
        editionId: "evt_001",
        type: "kids",
        title: "Rhema Kids 2026",
        slug: "rhema-kids-2026",
        description: "A fun-filled program for children during Rhema Feast at Uhuru Park.",
        capacity: 500,
        price: 0,
        isPaid: false,
        requiresTicket: true,
        startDate: "2026-08-31T09:00:00Z",
        endDate: "2026-09-04T16:00:00Z",
        venue: "Kids Pavilion, Uhuru Park",
        status: "PUBLISHED",
        agenda: MOCK_AGENDA_KIDS,
      },
      {
        id: "sub_003",
        editionId: "evt_001",
        type: "business-summit",
        title: "Rhema Business Forum 2026",
        slug: "rhema-business-forum-2026",
        description: "Marketplace Alignment & Economic Strategy. A tactical gathering of elite, Kingdom-based individuals, business owners, investors, and future financial pillars.",
        capacity: 1000,
        price: 2500,
        isPaid: true,
        requiresTicket: true,
        startDate: "2026-08-31T08:00:00Z",
        endDate: "2026-08-31T19:00:00Z",
        venue: "Business Forum Tents, Uhuru Park Gardens",
        status: "PUBLISHED",
        agenda: MOCK_AGENDA_BUSINESS,
      },
    ],
  },
  {
    id: "evt_002",
    seriesId: "ser_001",
    seriesTitle: "Rhema Feast",
    year: "2025",
    slug: "rhema-feast-2025",
    title: "Rhema Feast 2025",
    description:
      "A five-day gathering of worship, teaching, and fellowship.",
    status: "COMPLETED",
    startDate: "2025-09-01T09:00:00Z",
    endDate: "2025-09-05T18:00:00Z",
    venue: "Rhema Christian Centre, Nairobi",
    capacity: 2500,
    createdAt: "2025-02-01T10:00:00Z",
    updatedAt: "2025-09-06T14:30:00Z",
    guestInvitesEnabled: true,
    defaultPlusOneCount: 2,
    inviteExpiryHours: 168,
    agenda: MOCK_AGENDA,
    partners: MOCK_PARTNERS,
  },
  {
    id: "evt_003",
    seriesId: "ser_001",
    seriesTitle: "Rhema Feast",
    year: "2024",
    slug: "rhema-feast-2024",
    title: "Rhema Feast 2024",
    description:
      "Our inaugural Rhema Feast gathering.",
    status: "COMPLETED",
    startDate: "2024-09-02T09:00:00Z",
    endDate: "2024-09-06T18:00:00Z",
    venue: "Rhema Christian Centre, Nairobi",
    capacity: 2000,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-09-07T14:30:00Z",
    guestInvitesEnabled: true,
    defaultPlusOneCount: 2,
    inviteExpiryHours: 168,
    agenda: MOCK_AGENDA,
  },
  {
    id: "evt_004",
    seriesId: "ser_002",
    seriesTitle: "Rhema Fellowship",
    year: "2026",
    slug: "rhema-fellowship-2026",
    title: "Rhema Fellowship",
    description:
      "Weekly fellowship gathering every Sunday. Join us for worship, teaching, and community.",
    status: "ONGOING",
    startDate: "2026-01-04T09:00:00Z",
    endDate: "2026-12-27T11:00:00Z",
    venue: "Ruach Assembly, Nairobi",
    capacity: 500,
    createdAt: "2026-01-01T10:00:00Z",
    updatedAt: "2026-06-15T14:30:00Z",
  },
];

// Backward-compatible event list for public/dashboard queries
const MOCK_EVENTS: EventEdition[] = MOCK_EDITIONS;

// -- Series queries --

export async function getMockSeries(): Promise<EventSeries[]> {
  return MOCK_SERIES.map((s) => ({
    ...s,
    latestEdition: MOCK_EDITIONS
      .filter((e) => e.seriesId === s.id)
      .sort((a, b) => parseInt(b.year) - parseInt(a.year))[0],
    editionCount: MOCK_EDITIONS.filter((e) => e.seriesId === s.id).length,
  }));
}

export async function getMockSeriesById(id: string): Promise<EventSeries | null> {
  const all = await getMockSeries();
  return all.find((s) => s.id === id) ?? null;
}

export async function getMockEditionsBySeries(seriesId: string): Promise<EventEdition[]> {
  return MOCK_EDITIONS.filter((e) => e.seriesId === seriesId)
    .sort((a, b) => parseInt(b.year) - parseInt(a.year));
}

// -- Edition / SubEvent queries --

export async function getMockSubEventsByEdition(editionId: string): Promise<SubEvent[]> {
  const edition = MOCK_EDITIONS.find((e) => e.id === editionId);
  return edition?.subEvents ?? [];
}

export async function getMockPublicEvents(): Promise<PaginatedResult<EventEdition>> {
  const published = MOCK_EVENTS.filter((e) => e.status === "PUBLISHED" || e.status === "ONGOING");
  return {
    data: published,
    total: published.length,
    page: 1,
    pageSize: 12,
    totalPages: 1,
  };
}

export async function getMockDashboardEvents(): Promise<PaginatedResult<EventEdition>> {
  return {
    data: MOCK_EVENTS,
    total: MOCK_EVENTS.length,
    page: 1,
    pageSize: 20,
    totalPages: 1,
  };
}

export async function getMockEventById(id: string): Promise<EventEdition | null> {
  return MOCK_EVENTS.find((e) => e.id === id) ?? null;
}

export async function getMockSubEventById(subEventId: string): Promise<SubEvent | null> {
  for (const edition of MOCK_EDITIONS) {
    const found = edition.subEvents?.find((s) => s.id === subEventId);
    if (found) return found;
  }
  return null;
}

export async function getMockEditionIdBySubEvent(subEventId: string): Promise<string | null> {
  for (const edition of MOCK_EDITIONS) {
    const found = edition.subEvents?.find((s) => s.id === subEventId);
    if (found) return edition.id;
  }
  return null;
}
