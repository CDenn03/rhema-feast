import {
  getMockPublicEvents,
  getMockDashboardEvents,
  getMockEventById,
} from "./mock";

export async function getPublicEvents() {
  try {
    return await getMockPublicEvents();
  } catch {
    return null;
  }
}

export async function getDashboardEvents() {
  return getMockDashboardEvents();
}

export async function getEventById(id: string) {
  return getMockEventById(id);
}
