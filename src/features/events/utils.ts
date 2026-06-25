export function isEventLive(status: string): boolean {
  return status === "ONGOING";
}

export function isEventPast(status: string): boolean {
  return status === "COMPLETED";
}
