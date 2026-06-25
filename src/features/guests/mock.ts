import type { GuestCategory, GuestInvite, GuestConfirmation, GuestCompanion, GuestQRCode } from "./types";

export const MOCK_GUEST_CATEGORIES: GuestCategory[] = [
  { id: "gc_001", name: "Clergy", description: "Religious leaders and clergy members", isActive: true, color: "bg-accent-gold" },
  { id: "gc_002", name: "Government Official", description: "Government representatives and officials", isActive: true, color: "bg-accent-gold" },
  { id: "gc_003", name: "International Guest", description: "Guests travelling from outside the country", isActive: true, color: "bg-accent-gold" },
  { id: "gc_004", name: "Corporate Partner", description: "Corporate sponsors and partners", isActive: true, color: "bg-accent-gold" },
  { id: "gc_005", name: "Media & Influencer", description: "Press, media houses, and social influencers", isActive: true, color: "bg-accent-gold" },
  { id: "gc_006", name: "Community Leader", description: "Local community and civic leaders", isActive: false, color: "bg-stone-500" },
];

export const MOCK_ZONES = [
  { id: "zone_vip", eventId: "evt_001", name: "VIP Section", capacity: 200, currentCount: 45, allocationType: "FIXED", category: "SPECIAL_GUEST" },
  { id: "zone_balcony", eventId: "evt_001", name: "Balcony", capacity: 800, currentCount: 320, allocationType: "HYBRID", category: "HYBRID" },
  { id: "zone_main", eventId: "evt_001", name: "Main Hall", capacity: 2000, currentCount: 1500, allocationType: "FLEXIBLE", category: "GENERAL" },
];

export const MOCK_SEATS = [
  { id: "seat_v001", zoneId: "zone_vip", label: "VIP-A1", status: "occupied" },
  { id: "seat_v002", zoneId: "zone_vip", label: "VIP-A2", status: "occupied" },
  { id: "seat_v003", zoneId: "zone_vip", label: "VIP-A3", status: "occupied" },
  { id: "seat_v004", zoneId: "zone_vip", label: "VIP-B1", status: "occupied" },
  { id: "seat_v005", zoneId: "zone_vip", label: "VIP-B2", status: "available" },
  { id: "seat_v006", zoneId: "zone_vip", label: "VIP-B3", status: "available" },
  { id: "seat_b001", zoneId: "zone_balcony", label: "BL-01", status: "occupied" },
  { id: "seat_b002", zoneId: "zone_balcony", label: "BL-02", status: "occupied" },
  { id: "seat_b003", zoneId: "zone_balcony", label: "BL-03", status: "available" },
];

export const MOCK_GUEST_CONFIRMATIONS: GuestConfirmation[] = [
  { id: "gcf_001", guestInviteId: "gi_002", respondedAt: "2026-07-10T14:30:00Z", isAttending: true, companionCount: 2, notes: "Looking forward to the event!" },
  { id: "gcf_002", guestInviteId: "gi_003", respondedAt: "2026-07-12T09:15:00Z", isAttending: true, companionCount: 1, notes: "" },
  { id: "gcf_003", guestInviteId: "gi_004", respondedAt: "2026-07-14T11:00:00Z", isAttending: false, companionCount: 0, notes: "Sorry, I have a prior commitment." },
];

export const MOCK_GUEST_COMPANIONS: GuestCompanion[] = [
  { id: "gc_001", guestInviteId: "gi_002", name: "Mary Wanjiku", seatId: "seat_v002", addedToAttendeeList: true, seatLabel: "VIP-A2" },
  { id: "gc_002", guestInviteId: "gi_002", name: "Peter Wanjiku", seatId: "seat_v003", addedToAttendeeList: true, seatLabel: "VIP-A3" },
  { id: "gc_003", guestInviteId: "gi_003", name: "Sarah Kimani", seatId: "seat_b002", addedToAttendeeList: true, seatLabel: "BL-02" },
];

function makeCheckinPayload(eventId: string, inviteId: string, guestName: string, companionId: string | null, hostName?: string): string {
  return JSON.stringify({ eventId, inviteId, guestName, companionId, hostName, ts: Date.now() });
}

export const MOCK_GUEST_QR_CODES: GuestQRCode[] = [
  { id: "qr_001", guestInviteId: "gi_002", companionId: null, signingKeyId: "sk_001", qrPayload: makeCheckinPayload("evt_001", "gi_002", "John Wanjiku", null), issuedAt: "2026-07-10T14:31:00Z", isRevoked: false, label: "John Wanjiku" },
  { id: "qr_002", guestInviteId: "gi_002", companionId: "gc_001", signingKeyId: "sk_001", qrPayload: makeCheckinPayload("evt_001", "gi_002", "Mary Wanjiku", "gc_001", "John Wanjiku"), issuedAt: "2026-07-10T14:31:00Z", isRevoked: false, label: "Mary Wanjiku (Companion)" },
  { id: "qr_003", guestInviteId: "gi_002", companionId: "gc_002", signingKeyId: "sk_001", qrPayload: makeCheckinPayload("evt_001", "gi_002", "Peter Wanjiku", "gc_002", "John Wanjiku"), issuedAt: "2026-07-10T14:31:00Z", isRevoked: false, label: "Peter Wanjiku (Companion)" },
  { id: "qr_004", guestInviteId: "gi_003", companionId: null, signingKeyId: "sk_001", qrPayload: makeCheckinPayload("evt_001", "gi_003", "James Kimani", null), issuedAt: "2026-07-12T09:16:00Z", isRevoked: false, label: "James Kimani" },
  { id: "qr_005", guestInviteId: "gi_003", companionId: "gc_003", signingKeyId: "sk_001", qrPayload: makeCheckinPayload("evt_001", "gi_003", "Sarah Kimani", "gc_003", "James Kimani"), issuedAt: "2026-07-12T09:16:00Z", isRevoked: false, label: "Sarah Kimani (Companion)" },
];

export const MOCK_GUEST_INVITES: GuestInvite[] = [
  {
    id: "gi_001",
    eventId: "evt_001",
    guestCategoryId: "gc_001",
    name: "Bishop David Mwangi",
    email: "bishop.mwangi@example.com",
    phone: "+254 712 345 678",
    organization: "Rhema Christian Centre",
    defaultPlusOneCount: 2,
    maxPlusOnes: 3,
    zoneId: "zone_vip",
    seatId: "seat_v001",
    status: "pending",
    inviteSentAt: "2026-07-15T08:00:00Z",
    expiresAt: "2026-07-22T08:00:00Z",
    token: "tok_abc123_def456",
    createdBy: "user_admin",
    category: MOCK_GUEST_CATEGORIES[0],
  },
  {
    id: "gi_002",
    eventId: "evt_001",
    guestCategoryId: "gc_003",
    name: "John Wanjiku",
    email: "john.wanjiku@example.com",
    phone: "+254 723 456 789",
    organization: "African Leadership Institute",
    defaultPlusOneCount: 2,
    maxPlusOnes: 2,
    zoneId: "zone_vip",
    seatId: "seat_v004",
    status: "confirmed",
    inviteSentAt: "2026-07-08T10:00:00Z",
    expiresAt: "2026-07-15T10:00:00Z",
    token: "tok_def789_ghi012",
    createdBy: "user_admin",
    category: MOCK_GUEST_CATEGORIES[2],
    confirmation: MOCK_GUEST_CONFIRMATIONS[0],
    companions: [MOCK_GUEST_COMPANIONS[0], MOCK_GUEST_COMPANIONS[1]],
    qrCodes: [MOCK_GUEST_QR_CODES[0], MOCK_GUEST_QR_CODES[1], MOCK_GUEST_QR_CODES[2]],
  },
  {
    id: "gi_003",
    eventId: "evt_001",
    guestCategoryId: "gc_004",
    name: "James Kimani",
    email: "james.kimani@example.com",
    phone: "+254 734 567 890",
    organization: "Safaricom PLC",
    defaultPlusOneCount: 2,
    maxPlusOnes: 1,
    zoneId: "zone_balcony",
    seatId: "seat_b001",
    status: "confirmed",
    inviteSentAt: "2026-07-10T09:00:00Z",
    expiresAt: "2026-07-17T09:00:00Z",
    token: "tok_ghi345_jkl678",
    createdBy: "user_admin",
    category: MOCK_GUEST_CATEGORIES[3],
    confirmation: MOCK_GUEST_CONFIRMATIONS[1],
    companions: [MOCK_GUEST_COMPANIONS[2]],
    qrCodes: [MOCK_GUEST_QR_CODES[3], MOCK_GUEST_QR_CODES[4]],
  },
  {
    id: "gi_004",
    eventId: "evt_001",
    guestCategoryId: "gc_005",
    name: "Grace Akinyi",
    email: "grace.akinyi@example.com",
    phone: "+254 745 678 901",
    organization: "Citizen Digital",
    defaultPlusOneCount: 2,
    maxPlusOnes: 2,
    zoneId: "zone_vip",
    seatId: null,
    status: "declined",
    inviteSentAt: "2026-07-11T14:00:00Z",
    expiresAt: "2026-07-18T14:00:00Z",
    token: "tok_jkl901_mno234",
    createdBy: "user_admin",
    category: MOCK_GUEST_CATEGORIES[4],
    confirmation: MOCK_GUEST_CONFIRMATIONS[2],
  },
  {
    id: "gi_005",
    eventId: "evt_001",
    guestCategoryId: "gc_001",
    name: "Pastor Samuel Ochieng",
    email: "samuel.ochieng@example.com",
    phone: "+254 756 789 012",
    organization: "House of Grace Church",
    defaultPlusOneCount: 2,
    maxPlusOnes: 2,
    zoneId: "zone_vip",
    seatId: null,
    status: "expired",
    inviteSentAt: "2026-06-20T08:00:00Z",
    expiresAt: "2026-06-27T08:00:00Z",
    token: "tok_mno567_pqr890",
    createdBy: "user_admin",
    category: MOCK_GUEST_CATEGORIES[0],
  },
  {
    id: "gi_006",
    eventId: "evt_001",
    guestCategoryId: "gc_002",
    name: "Hon. Anne Waiguru",
    email: "anne.waiguru@example.com",
    phone: "+254 767 890 123",
    organization: "County Government of Kirinyaga",
    defaultPlusOneCount: 2,
    maxPlusOnes: 3,
    zoneId: "zone_vip",
    seatId: null,
    status: "pending",
    inviteSentAt: "2026-07-16T10:00:00Z",
    expiresAt: "2026-07-23T10:00:00Z",
    token: "tok_pqr123_stu456",
    createdBy: "user_admin",
    category: MOCK_GUEST_CATEGORIES[1],
  },
];

export function getMockGuestInvites(eventId: string): GuestInvite[] {
  return MOCK_GUEST_INVITES.filter((i) => i.eventId === eventId);
}

export function getMockGuestInviteById(id: string): GuestInvite | undefined {
  return MOCK_GUEST_INVITES.find((i) => i.id === id);
}

export function getMockGuestInviteByToken(token: string): GuestInvite | undefined {
  return MOCK_GUEST_INVITES.find((i) => i.token === token);
}

export function getMockGuestCategories(): GuestCategory[] {
  return MOCK_GUEST_CATEGORIES.filter((c) => c.isActive);
}

export function getMockGuestCategoryById(id: string): GuestCategory | undefined {
  return MOCK_GUEST_CATEGORIES.find((c) => c.id === id);
}
