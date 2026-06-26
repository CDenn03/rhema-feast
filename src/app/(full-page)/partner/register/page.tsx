"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Handshake, ArrowLeft, Check, Megaphone, Sparkles } from "lucide-react";
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

const PARTNER_TYPES = [
  {
    value: "SPONSOR" as const,
    label: "Sponsor",
    description: "Fund or co-host part of the event",
    icon: Handshake,
  },
  {
    value: "MEDIA" as const,
    label: "Media Partner",
    description: "Cover, broadcast, or amplify the event",
    icon: Megaphone,
  },
  {
    value: "OTHER" as const,
    label: "Other",
    description: "A different kind of partnership in mind",
    icon: Sparkles,
  },
];

export default function PartnerRegisterPage() {
  const router = useRouter();
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: { eventIds: [], partnerType: "SPONSOR" },
  });

  const partnerType = watch("partnerType");

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
    <main className="container mx-auto px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/#register"
          className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-gradient-to-br from-accent-gold/10 via-transparent to-transparent px-4 py-5 sm:px-6 sm:py-6">
            <div className="flex items-start gap-3 sm:items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10 ring-1 ring-accent-gold/20">
                <Handshake className="h-5 w-5 text-accent-gold" />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-xl sm:text-2xl">Become a Partner</CardTitle>
                <CardDescription className="mt-0.5 text-sm">
                  Join us as a sponsor or media partner for Rhema Feast.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-4 py-6 sm:px-6 sm:py-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact details */}
              <section className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Your details
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" placeholder="Your full name" {...register("fullName")} />
                    {errors.fullName && (
                      <p className="text-sm text-destructive">{errors.fullName.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" type="tel" placeholder="+254 7XX XXX XXX" {...register("phone")} />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="organization">Organization *</Label>
                    <Input id="organization" placeholder="Organization name" {...register("organization")} />
                    {errors.organization && (
                      <p className="text-sm text-destructive">{errors.organization.message}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Partnership type */}
              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Partnership type *
                </h3>
                <div className="grid gap-2 sm:grid-cols-3">
                  {PARTNER_TYPES.map(({ value, label, description, icon: Icon }) => {
                    const active = partnerType === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setValue("partnerType", value, { shouldValidate: true })}
                        className={`flex flex-col gap-1.5 rounded-lg border p-3 text-left transition-colors ${
                          active
                            ? "border-accent-gold bg-accent-gold/5 ring-1 ring-accent-gold/30"
                            : "border-border hover:bg-muted/50"
                        }`}
                        aria-pressed={active}
                      >
                        <div className="flex items-center justify-between">
                          <Icon
                            className={`h-4 w-4 ${active ? "text-accent-gold" : "text-muted-foreground"}`}
                          />
                          {active && <Check className="h-3.5 w-3.5 text-accent-gold" />}
                        </div>
                        <p className="text-sm font-medium leading-snug">{label}</p>
                        <p className="text-xs text-muted-foreground leading-snug">{description}</p>
                      </button>
                    );
                  })}
                </div>
                {/* keep registered for RHF/zod, hidden since the buttons above drive the value */}
                <select className="hidden" {...register("partnerType")} aria-hidden tabIndex={-1}>
                  <option value="SPONSOR" />
                  <option value="MEDIA" />
                  <option value="OTHER" />
                </select>
                {errors.partnerType && (
                  <p className="text-sm text-destructive">{errors.partnerType.message}</p>
                )}
              </section>

              {/* Events */}
              <section className="space-y-3">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Events *
                  </h3>
                  <span className="text-xs text-muted-foreground">Select one or more</span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {MOCK_EDITIONS.filter(
                    (e) => e.status === "PUBLISHED" || e.status === "ONGOING"
                  ).map((event) => {
                    const checked = selectedEvents.includes(event.id);
                    return (
                      <label
                        key={event.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors ${
                          checked
                            ? "border-accent-gold bg-accent-gold/5"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <Checkbox
                          checked={checked}
                          onChange={() => toggleEvent(event.id)}
                          className="mt-0.5 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium leading-snug">{event.title}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {event.startDate.slice(0, 10)} &middot; {event.venue}
                          </p>
                        </div>
                        {checked && (
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-gold" />
                        )}
                      </label>
                    );
                  })}
                </div>
                {errors.eventIds && (
                  <p className="text-sm text-destructive">{errors.eventIds.message}</p>
                )}
              </section>

              {/* Notes */}
              <section className="space-y-1.5">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any specific areas of partnership interest..."
                  className="min-h-[100px]"
                  {...register("notes")}
                />
              </section>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting…" : "Submit Partnership Request"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}