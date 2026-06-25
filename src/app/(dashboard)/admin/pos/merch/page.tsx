import { PageHeader } from "@/components/layout/PageHeader";

export default function POSMerchPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="POS Merch" description="Sell merchandise at the point of sale." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "POS", href: "/admin/pos" }, { label: "Merch" }]} />
    </div>
  );
}
