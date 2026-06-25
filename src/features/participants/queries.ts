import { participantService } from "./services/participantService";

export async function getParticipants(eventId: string) {
  return participantService.list(eventId);
}
