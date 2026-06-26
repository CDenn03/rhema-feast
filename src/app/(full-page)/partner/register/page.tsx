"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Handshake, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { MOCK_EDITIONS } from "@/features/events/mock";

const partnerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Valid phone number required"),
  organization: z.string().min(2, "Organization name required"),
  partnerType: z.enum(["SPONSOR", "MEDIA", "OTHER"]),
  notes: z.string().optional(),
  eventIds: z.array(z.string()).min(1, "Select at least one event"),
});

type PartnerFormData = z.infer<typeof partnerSchema>;

export default function PartnerRegisterPage() {
  const router = useRouter();
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: { eventIds: [], partnerType: "SPONSOR" },
  });

  const toggleEvent = (id: string) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const onSubmit = async (data: PartnerFormData) => {
    data.eventIds = selectedEvents;
    if (selectedEvents.length === 0) {
      toast.error("Select at least one event");
      return;
    }
    const payload = { ...data, type: "PARTNER" };
    console.log("Partner registration:", payload);
    toast.success("Partnership request submitted successfully!");
    router.push("/partner/success");
  };

  return (
    <main className="container mx-auto py-16 px-4">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/#register"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-gold/10">
                <Handshake className="h-5 w-5 text-accent-gold" />
              </div>
              <div>
                <CardTitle>Become a Partner</CardTitle>
                <CardDescription>
                  Join us as a sponsor or media partner for Rhema Feast.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" placeholder="Your full name" {...register("fullName")} />
                  {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" type="tel" placeholder="+254 7XX XXX XXX" {...register("phone")} />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization *</Label>
                  <Input id="organization" placeholder="Organization name" {...register("organization")} />
                  {errors.organization && <p className="text-sm text-destructive">{errors.organization.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="partnerType">Partnership Type *</Label>
                <select
                  id="partnerType"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  {...register("partnerType")}
                >
                  <option value="SPONSOR">Sponsor</option>
                  <option value="MEDIA">Media Partner</option>
                  <option value="OTHER">Other</option>
                </select>
                {errors.partnerType && <p className="text-sm text-destructive">{errors.partnerType.message}</p>}
              </div>

              <div className="space-y-2">
                <Label>Events * (select one or more)</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {MOCK_EDITIONS.filter((e) => e.status === "PUBLISHED" || e.status === "ONGOING").map((event) => (
                    <label
                      key={event.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                        selectedEvents.includes(event.id)
                          ? "border-accent-gold bg-accent-gold/5"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <Checkbox
                        checked={selectedEvents.includes(event.id)}
                        onChange={() => toggleEvent(event.id)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-snug">{event.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {event.startDate.slice(0, 10)} &middot; {event.venue}
                        </p>
                      </div>
                      {selectedEvents.includes(event.id) && (
                        <Check className="h-4 w-4 shrink-0 text-accent-gold mt-0.5" />
                      )}
                    </label>
                  ))}
                </div>
                {errors.eventIds && <p className="text-sm text-destructive">{errors.eventIds.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea id="notes" placeholder="Any specific areas of partnership interest..." {...register("notes")} />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting…" : "Submit Partnership Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
