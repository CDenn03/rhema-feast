import type { Testimonial } from "./types";

export const MOCK_TESTIMONIALS: Testimonial[] = [
  { id: "test_001", name: "Grace Akinyi", message: "Rhema Feast was a transformative experience. The worship and teachings deeply impacted my spiritual journey." },
  { id: "test_002", name: "Peter Kamau", message: "I have attended many conferences but Rhema Feast stands out. The organization and content were world-class." },
  { id: "test_003", name: "Esther Wambui", message: "The community and fellowship at Rhema Feast are unmatched. I made lifelong friends and grew in my faith." },
  { id: "test_004", name: "Dr. James Ochieng", message: "As a speaker, I was impressed by the level of engagement and hunger for the Word. A truly blessed event." },
  { id: "test_005", name: "Sarah Akinyi", message: "My first time attending and it exceeded all expectations. I will definitely be back next year!" },
  { id: "test_006", name: "Bishop David Mwangi", message: "Rhema Feast continues to be a beacon of hope and a platform for spiritual renewal in our nation." },
];

export function getMockTestimonials(): Testimonial[] {
  return MOCK_TESTIMONIALS;
}
