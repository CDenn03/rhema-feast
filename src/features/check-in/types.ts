export interface CheckInEntry {
  id: string;
  eventId: string;
  sourceType: "guest" | "companion" | "ticket";
  sourceId: string;
  name: string;
  category?: string;
  zoneId?: string;
  checkInTime: string;
  checkedInBy: string;
}

export interface Attendee {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
  ticketPackageId: string;
  ticketPackageName: string;
  qrPayload: string;
}

export interface CheckInStore {
  entries: CheckInEntry[];
  checkIn: (entry: Omit<CheckInEntry, "id" | "checkInTime" | "checkedInBy">) => void;
  undoCheckIn: (id: string) => void;
  isCheckedIn: (sourceType: string, sourceId: string) => boolean;
}
