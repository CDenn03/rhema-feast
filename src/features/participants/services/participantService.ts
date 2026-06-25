import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Participant, CreateParticipantDto } from "../types";
import type { PaginatedResult, PaginationParams } from "@/types";

export const participantService = {
  list: (eventId: string, params?: PaginationParams) =>
    apiClient.get<PaginatedResult<Participant>>(
      ENDPOINTS.participants.list(eventId),
      { params }
    ),

  detail: (eventId: string, id: string) =>
    apiClient.get<Participant>(ENDPOINTS.participants.detail(eventId, id)),

  create: (eventId: string, data: CreateParticipantDto) =>
    apiClient.post<Participant>(ENDPOINTS.participants.list(eventId), data),
};
