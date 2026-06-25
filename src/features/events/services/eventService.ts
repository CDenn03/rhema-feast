import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { Event, CreateEventDto, UpdateEventDto } from "../types";
import type { PaginatedResult, PaginationParams } from "@/types";

export const eventService = {
  list: (params?: PaginationParams) =>
    apiClient.get<PaginatedResult<Event>>(ENDPOINTS.events.list, { params }),

  detail: (id: string) =>
    apiClient.get<Event>(ENDPOINTS.events.detail(id)),

  create: (data: CreateEventDto) =>
    apiClient.post<Event>(ENDPOINTS.events.create, data),

  update: (id: string, data: UpdateEventDto) =>
    apiClient.patch<Event>(ENDPOINTS.events.update(id), data),

  delete: (id: string) =>
    apiClient.delete(ENDPOINTS.events.delete(id)),
};
