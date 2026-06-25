export interface ScanResult {
  valid: boolean;
  ticketId?: string;
  participantName?: string;
  eventName?: string;
  message: string;
  scannedAt: string;
}

export interface CheckInLog {
  id: string;
  ticketId: string;
  participantId: string;
  eventId: string;
  scannedAt: string;
  deviceId?: string;
}
