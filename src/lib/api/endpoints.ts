export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const ENDPOINTS = {
  auth: {
    me: `${API_BASE_URL}/auth/me`,
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    register: `${API_BASE_URL}/auth/register`,
  },
  events: {
    list: `${API_BASE_URL}/events`,
    detail: (id: string) => `${API_BASE_URL}/events/${id}`,
    create: `${API_BASE_URL}/events`,
    update: (id: string) => `${API_BASE_URL}/events/${id}`,
    delete: (id: string) => `${API_BASE_URL}/events/${id}`,
  },
  participants: {
    list: (eventId: string) => `${API_BASE_URL}/events/${eventId}/participants`,
    detail: (eventId: string, id: string) =>
      `${API_BASE_URL}/events/${eventId}/participants/${id}`,
  },
  ticketing: {
    list: (eventId: string) => `${API_BASE_URL}/events/${eventId}/tickets`,
    detail: (eventId: string, id: string) =>
      `${API_BASE_URL}/events/${eventId}/tickets/${id}`,
  },
  checkin: {
    scan: `${API_BASE_URL}/checkin/scan`,
    logs: (eventId: string) => `${API_BASE_URL}/events/${eventId}/checkin/logs`,
  },
  orders: {
    list: `${API_BASE_URL}/orders`,
    detail: (id: string) => `${API_BASE_URL}/orders/${id}`,
  },
  payments: {
    list: `${API_BASE_URL}/payments`,
    initiate: `${API_BASE_URL}/payments/initiate`,
  },
  pos: {
    products: `${API_BASE_URL}/pos/products`,
    order: `${API_BASE_URL}/pos/order`,
  },
  merch: {
    inventory: `${API_BASE_URL}/merch/inventory`,
  },
  partners: {
    list: `${API_BASE_URL}/partners`,
    detail: (id: string) => `${API_BASE_URL}/partners/${id}`,
  },
  zones: {
    list: (eventId: string) => `${API_BASE_URL}/events/${eventId}/zones`,
  },
  communications: {
    campaigns: `${API_BASE_URL}/communications/campaigns`,
  },
  admin: {
    users: `${API_BASE_URL}/admin/users`,
    roles: `${API_BASE_URL}/admin/roles`,
    devices: `${API_BASE_URL}/admin/devices`,
  },
} as const;
