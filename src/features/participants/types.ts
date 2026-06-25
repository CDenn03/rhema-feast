export interface Participant {
  id: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  ticketId?: string;
  checkedIn: boolean;
  checkedInAt?: string;
  createdAt: string;
}

export interface CreateParticipantDto {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}
