export interface POSProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  imageUrl?: string;
  stock?: number;
}

export interface CartItem {
  product: POSProduct;
  quantity: number;
}
