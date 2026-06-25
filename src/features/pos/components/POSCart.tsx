"use client";

import { useCartStore } from "../store/cartStore";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export function POSCart() {
  const { items, removeItem, updateQty, clearCart, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border p-6 text-center">
        <p className="text-muted-foreground">Cart is empty</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-lg border">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.map((item) => (
          <div key={item.product.id} className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.product.name}</p>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(item.product.price)}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateQty(item.product.id, item.quantity - 1)}
              >
                −
              </Button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateQty(item.product.id, item.quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4 space-y-3">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total())}</span>
        </div>
        <Button className="w-full">Charge {formatCurrency(total())}</Button>
        <Button variant="outline" className="w-full" onClick={clearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}
