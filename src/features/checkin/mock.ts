import type { CheckInLog } from "./types";

export const MOCK_CHECKIN_LOGS: CheckInLog[] = [
  { id: "cl_001", ticketId: "tkt_001", participantId: "p_001", eventId: "evt_001", scannedAt: "2026-08-31T08:45:00Z", deviceId: "dev-001" },
  { id: "cl_002", ticketId: "tkt_002", participantId: "p_002", eventId: "evt_001", scannedAt: "2026-08-31T09:10:00Z", deviceId: "dev-001" },
  { id: "cl_003", ticketId: "tkt_004", participantId: "p_004", eventId: "evt_001", scannedAt: "2026-08-31T08:30:00Z", deviceId: "dev-002" },
  { id: "cl_004", ticketId: "tkt_005", participantId: "p_005", eventId: "evt_001", scannedAt: "2026-09-01T09:00:00Z", deviceId: "dev-001" },
  { id: "cl_005", ticketId: "tkt_007", participantId: "p_007", eventId: "evt_001", scannedAt: "2026-08-31T10:15:00Z", deviceId: "dev-002" },
  { id: "cl_006", ticketId: "tkt_009", participantId: "p_009", eventId: "evt_001", scannedAt: "2026-08-31T11:00:00Z", deviceId: "dev-001" },
];

export function getMockCheckInLogs(eventId: string): CheckInLog[] {
  return MOCK_CHECKIN_LOGS.filter((l) => l.eventId === eventId);
}
