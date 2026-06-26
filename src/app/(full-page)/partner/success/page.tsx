import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function PartnerSuccessPage() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center py-24 px-4 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-gold/10">
        <CheckCircle className="h-8 w-8 text-accent-gold" />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">Thank You!</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Your registration has been received. Our team will review and get back to you within 2&ndash;3 business days.
      </p>
      <div className="mt-8 flex gap-4">
        <Button render={<Link href="/" />} size="lg">
          Back to Home
        </Button>
        <Button render={<Link href="/events" />} size="lg" variant="outline">
          View Events
        </Button>
      </div>
    </main>
  );
}
