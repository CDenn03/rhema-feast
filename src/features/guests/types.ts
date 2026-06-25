export type GuestInviteStatus = "pending" | "confirmed" | "declined" | "expired";

export interface GuestCategory {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  color: string;
}

export interface GuestInvite {
  id: string;
  eventId: string;
  guestCategoryId: string;
  name: string;
  email: string;
  phone: string;
  organization: string;
  defaultPlusOneCount: number;
  maxPlusOnes: number;
  zoneId: string;
  seatId: string | null;
  status: GuestInviteStatus;
  inviteSentAt: string;
  expiresAt: string;
  token: string;
  createdBy: string;
  category?: GuestCategory;
  confirmation?: GuestConfirmation;
  companions?: GuestCompanion[];
  qrCodes?: GuestQRCode[];
}

export interface GuestConfirmation {
  id: string;
  guestInviteId: string;
  respondedAt: string;
  isAttending: boolean;
  companionCount: number;
  notes: string;
}

export interface GuestCompanion {
  id: string;
  guestInviteId: string;
  name: string;
  seatId: string | null;
  addedToAttendeeList: boolean;
  seatLabel?: string;
}

export interface GuestQRCode {
  id: string;
  guestInviteId: string;
  companionId: string | null;
  signingKeyId: string;
  qrPayload: string;
  issuedAt: string;
  isRevoked: boolean;
  label: string;
}
