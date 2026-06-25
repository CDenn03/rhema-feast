import type { POSProduct } from "./types";

export const MOCK_POS_PRODUCTS: POSProduct[] = [
  { id: "pos_001", name: "Bottled Water", price: 100, currency: "KES", category: "Beverages", stock: 500 },
  { id: "pos_002", name: "Soft Drink (Can)", price: 150, currency: "KES", category: "Beverages", stock: 400 },
  { id: "pos_003", name: "Fresh Juice", price: 200, currency: "KES", category: "Beverages", stock: 200 },
  { id: "pos_004", name: "Samosa (3 pcs)", price: 150, currency: "KES", category: "Food", stock: 300 },
  { id: "pos_005", name: "Chicken Wrap", price: 350, currency: "KES", category: "Food", stock: 150 },
  { id: "pos_006", name: "Chipo (Fries)", price: 200, currency: "KES", category: "Food", stock: 250 },
  { id: "pos_007", name: "Mandazi (2 pcs)", price: 100, currency: "KES", category: "Food", stock: 350 },
  { id: "pos_008", name: "Hot Coffee", price: 200, currency: "KES", category: "Beverages", stock: 300 },
  { id: "pos_009", name: "Iced Tea", price: 180, currency: "KES", category: "Beverages", stock: 200 },
  { id: "pos_010", name: "Program Booklet", price: 500, currency: "KES", category: "Merchandise", stock: 100 },
];

export function getMockPOSProducts(): POSProduct[] {
  return MOCK_POS_PRODUCTS;
}
