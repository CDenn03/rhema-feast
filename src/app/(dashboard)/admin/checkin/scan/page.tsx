import { QRScanner } from "@/features/checkin/components/QRScanner";
import { PageHeader } from "@/components/layout/PageHeader";

export default function ScanPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Scan Tickets" description="Scan QR codes to check in attendees." breadcrumbs={[{ label: "Dashboard", href: "/admin" }, { label: "Check-in", href: "/admin/checkin" }, { label: "Scan" }]} />
      <QRScanner />
    </div>
  );
}
