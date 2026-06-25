import type { MerchItem } from "./types";

export const MOCK_MERCH: MerchItem[] = [
  { id: "merch_001", name: "Rhema Feast 2026 T-Shirt", sku: "RF-TS-001", price: 1200, stock: 150, category: "Apparel", imageUrl: undefined },
  { id: "merch_002", name: "Rhema Feast Cap", sku: "RF-CP-001", price: 800, stock: 200, category: "Apparel", imageUrl: undefined },
  { id: "merch_003", name: "Conference Notebook", sku: "RF-NB-001", price: 500, stock: 300, category: "Stationery", imageUrl: undefined },
  { id: "merch_004", name: "Rhema Feast Pen Set", sku: "RF-PN-001", price: 300, stock: 500, category: "Stationery", imageUrl: undefined },
  { id: "merch_005", name: "Worship Album CD", sku: "RF-CD-001", price: 1000, stock: 80, category: "Media", imageUrl: undefined },
  { id: "merch_006", name: "Limited Edition Hoodie", sku: "RF-HD-001", price: 2500, stock: 40, category: "Apparel", imageUrl: undefined },
  { id: "merch_007", name: "Tote Bag", sku: "RF-TB-001", price: 600, stock: 250, category: "Accessories", imageUrl: undefined },
  { id: "merch_008", name: "Water Bottle", sku: "RF-WB-001", price: 450, stock: 180, category: "Accessories", imageUrl: undefined },
];

export function getMockMerch(): MerchItem[] {
  return MOCK_MERCH;
}
