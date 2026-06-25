import { apiClient } from "@/lib/api/client";
import { API_BASE_URL } from "@/lib/api/endpoints";
import type { Testimonial } from "../types";

export const testimonialService = {
  list: () => apiClient.get<Testimonial[]>(`${API_BASE_URL}/testimonials`),
};
