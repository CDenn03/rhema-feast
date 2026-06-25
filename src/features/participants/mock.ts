import type { Participant } from "./types";

export const MOCK_PARTICIPANTS: Participant[] = [
  { id: "p_001", eventId: "evt_001", firstName: "Peter", lastName: "Kamau", email: "peter.kamau@example.com", phone: "+254 701 111 111", ticketId: "tkt_001", checkedIn: true, checkedInAt: "2026-08-31T08:45:00Z", createdAt: "2026-07-01T10:00:00Z" },
  { id: "p_002", eventId: "evt_001", firstName: "Esther", lastName: "Wambui", email: "esther.wambui@example.com", phone: "+254 702 222 222", ticketId: "tkt_002", checkedIn: true, checkedInAt: "2026-08-31T09:10:00Z", createdAt: "2026-07-02T14:30:00Z" },
  { id: "p_003", eventId: "evt_001", firstName: "Daniel", lastName: "Muthama", email: "daniel.muthama@example.com", phone: "+254 703 333 333", ticketId: "tkt_003", checkedIn: false, checkedInAt: undefined, createdAt: "2026-07-03T09:15:00Z" },
  { id: "p_004", eventId: "evt_001", firstName: "Faith", lastName: "Njoki", email: "faith.njoki@example.com", phone: "+254 704 444 444", ticketId: "tkt_004", checkedIn: true, checkedInAt: "2026-08-31T08:30:00Z", createdAt: "2026-06-15T11:00:00Z" },
  { id: "p_005", eventId: "evt_001", firstName: "Samuel", lastName: "Kiprop", email: "samuel.kiprop@example.com", phone: "+254 705 555 555", ticketId: "tkt_005", checkedIn: true, checkedInAt: "2026-09-01T09:00:00Z", createdAt: "2026-07-05T16:45:00Z" },
  { id: "p_006", eventId: "evt_001", firstName: "Grace", lastName: "Otieno", email: "grace.otieno@example.com", phone: "+254 706 666 666", ticketId: "tkt_006", checkedIn: false, checkedInAt: undefined, createdAt: "2026-07-10T08:30:00Z" },
  { id: "p_007", eventId: "evt_001", firstName: "Joseph", lastName: "Njoroge", email: "joseph.njoroge@example.com", phone: "+254 707 777 777", ticketId: "tkt_007", checkedIn: true, checkedInAt: "2026-08-31T10:15:00Z", createdAt: "2026-07-12T12:00:00Z" },
  { id: "p_008", eventId: "evt_001", firstName: "Sarah", lastName: "Akinyi", email: "sarah.akinyi@example.com", phone: "+254 708 888 888", ticketId: "tkt_008", checkedIn: false, checkedInAt: undefined, createdAt: "2026-07-08T15:20:00Z" },
  { id: "p_009", eventId: "evt_001", firstName: "Michael", lastName: "Omondi", email: "michael.omondi@example.com", phone: "+254 709 999 999", ticketId: "tkt_009", checkedIn: true, checkedInAt: "2026-08-31T11:00:00Z", createdAt: "2026-06-20T10:10:00Z" },
  { id: "p_010", eventId: "evt_001", firstName: "Ruth", lastName: "Chepkemoi", email: "ruth.chepkemoi@example.com", phone: "+254 710 000 000", ticketId: "tkt_010", checkedIn: false, checkedInAt: undefined, createdAt: "2026-07-04T13:00:00Z" },
  { id: "p_011", eventId: "evt_002", firstName: "James", lastName: "Mwangi", email: "james.mwangi@example.com", phone: "+254 711 222 333", ticketId: undefined, checkedIn: false, checkedInAt: undefined, createdAt: "2026-08-10T12:00:00Z" },
  { id: "p_012", eventId: "evt_002", firstName: "Alice", lastName: "Wanjiku", email: "alice.wanjiku@example.com", phone: "+254 711 444 555", ticketId: undefined, checkedIn: false, checkedInAt: undefined, createdAt: "2026-08-11T09:30:00Z" },
];

export function getMockParticipants(eventId: string): Participant[] {
  return MOCK_PARTICIPANTS.filter((p) => p.eventId === eventId);
}
