import { apiClient } from "@/lib/api/client";
import { ENDPOINTS } from "@/lib/api/endpoints";
import type { ScanResult, CheckInLog } from "../types";

export const checkinService = {
  scan: (code: string) =>
    apiClient.post<ScanResult>(ENDPOINTS.checkin.scan, { code }),

  getLogs: (eventId: string) =>
    apiClient.get<CheckInLog[]>(ENDPOINTS.checkin.logs(eventId)),
};
