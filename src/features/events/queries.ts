import {
  getMockPublicEvents,
  getMockDashboardEvents,
  getMockEventById,
  getMockSeries,
  getMockSeriesById,
  getMockEditionsBySeries,
  getMockSubEventsByEdition,
  getMockSubEventById,
  getMockEditionIdBySubEvent,
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

// -- Series queries --
export async function getSeries() {
  return getMockSeries();
}

export async function getSeriesById(id: string) {
  return getMockSeriesById(id);
}

export async function getEditionsBySeries(seriesId: string) {
  return getMockEditionsBySeries(seriesId);
}

export async function getSubEventsByEdition(editionId: string) {
  return getMockSubEventsByEdition(editionId);
}

export async function getSubEventById(subEventId: string) {
  return getMockSubEventById(subEventId);
}

export async function getEditionIdBySubEvent(subEventId: string) {
  return getMockEditionIdBySubEvent(subEventId);
}
