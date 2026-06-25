import {
  getMockGuestInvites,
  getMockGuestInviteById,
  getMockGuestInviteByToken,
  getMockGuestCategories,
  getMockGuestCategoryById,
} from "./mock";

export async function getGuestInvites(eventId: string) {
  return getMockGuestInvites(eventId);
}

export async function getGuestInviteById(id: string) {
  return getMockGuestInviteById(id) ?? null;
}

export async function getGuestInviteByToken(token: string) {
  return getMockGuestInviteByToken(token) ?? null;
}

export async function getGuestCategories() {
  return getMockGuestCategories();
}

export async function getGuestCategoryById(id: string) {
  return getMockGuestCategoryById(id) ?? null;
}
