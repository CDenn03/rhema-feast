import type { Attendee } from "./types";

function attendeePayload(eventId: string, attendeeId: string, name: string): string {
  return JSON.stringify({ eventId, attendeeId, name, ts: Date.now() });
}

export const MOCK_ATTENDEES: Attendee[] = [
  { id: "att_001", eventId: "evt_001", name: "Peter Kamau", email: "peter.kamau@example.com", phone: "+254 701 111 111", ticketPackageId: "tp_001", ticketPackageName: "General Admission", qrPayload: attendeePayload("evt_001", "att_001", "Peter Kamau") },
  { id: "att_002", eventId: "evt_001", name: "Esther Wambui", email: "esther.wambui@example.com", phone: "+254 702 222 222", ticketPackageId: "tp_002", ticketPackageName: "VIP Pass", qrPayload: attendeePayload("evt_001", "att_002", "Esther Wambui") },
  { id: "att_003", eventId: "evt_001", name: "Daniel Muthama", email: "daniel.muthama@example.com", phone: "+254 703 333 333", ticketPackageId: "tp_001", ticketPackageName: "General Admission", qrPayload: attendeePayload("evt_001", "att_003", "Daniel Muthama") },
  { id: "att_004", eventId: "evt_001", name: "Faith Njoki", email: "faith.njoki@example.com", phone: "+254 704 444 444", ticketPackageId: "tp_002", ticketPackageName: "VIP Pass", qrPayload: attendeePayload("evt_001", "att_004", "Faith Njoki") },
  { id: "att_005", eventId: "evt_001", name: "Samuel Kiprop", email: "samuel.kiprop@example.com", phone: "+254 705 555 555", ticketPackageId: "tp_003", ticketPackageName: "Early Bird", qrPayload: attendeePayload("evt_001", "att_005", "Samuel Kiprop") },
  { id: "att_006", eventId: "evt_001", name: "Grace Otieno", email: "grace.otieno@example.com", phone: "+254 706 666 666", ticketPackageId: "tp_001", ticketPackageName: "General Admission", qrPayload: attendeePayload("evt_001", "att_006", "Grace Otieno") },
  { id: "att_007", eventId: "evt_001", name: "Joseph Njoroge", email: "joseph.njoroge@example.com", phone: "+254 707 777 777", ticketPackageId: "tp_001", ticketPackageName: "General Admission", qrPayload: attendeePayload("evt_001", "att_007", "Joseph Njoroge") },
  { id: "att_008", eventId: "evt_001", name: "Sarah Akinyi", email: "sarah.akinyi@example.com", phone: "+254 708 888 888", ticketPackageId: "tp_002", ticketPackageName: "VIP Pass", qrPayload: attendeePayload("evt_001", "att_008", "Sarah Akinyi") },
  { id: "att_009", eventId: "evt_001", name: "Michael Omondi", email: "michael.omondi@example.com", phone: "+254 709 999 999", ticketPackageId: "tp_001", ticketPackageName: "General Admission", qrPayload: attendeePayload("evt_001", "att_009", "Michael Omondi") },
  { id: "att_010", eventId: "evt_001", name: "Ruth Chepkemoi", email: "ruth.chepkemoi@example.com", phone: "+254 710 000 000", ticketPackageId: "tp_003", ticketPackageName: "Early Bird", qrPayload: attendeePayload("evt_001", "att_010", "Ruth Chepkemoi") },
];

export function getMockAttendees(eventId: string): Attendee[] {
  return MOCK_ATTENDEES.filter((a) => a.eventId === eventId);
}
