"use client";

import { useCartStore } from "../store/cartStore";
import { formatCurrency } from "@/lib/utils";
import type { POSProduct } from "../types";

interface Props {
  products?: POSProduct[];
}

const MOCK_PRODUCTS: POSProduct[] = [
  { id: "1", name: "T-Shirt", price: 1500, currency: "KES", category: "Merch" },
  { id: "2", name: "Cap", price: 800, currency: "KES", category: "Merch" },
  { id: "3", name: "Water Bottle", price: 200, currency: "KES", category: "Food" },
];

export function POSProductGrid({ products = MOCK_PRODUCTS }: Props) {
  const { addItem } = useCartStore();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => addItem(product)}
          className="flex flex-col items-start rounded-lg border p-4 text-left transition-colors hover:bg-accent"
        >
          <span className="text-xs text-muted-foreground">{product.category}</span>
          <span className="font-medium">{product.name}</span>
          <span className="text-sm text-primary">{formatCurrency(product.price)}</span>
        </button>
      ))}
    </div>
  );
}
