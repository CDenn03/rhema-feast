import { POSCart } from "@/features/pos/components/POSCart";
import { POSProductGrid } from "@/features/pos/components/POSProductGrid";

export default function POSPage() {
  return (
    <div className="flex h-full gap-4 p-4">
      <div className="flex-1">
        <POSProductGrid />
      </div>
      <div className="w-80">
        <POSCart />
      </div>
    </div>
  );
}
