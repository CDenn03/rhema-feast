"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Star, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { MOCK_EDITIONS } from "@/features/events/mock";

const testimonySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  testimony: z.string().min(20, "Please share at least a few sentences"),
  eventIds: z.array(z.string()).min(1, "Select at least one event"),
});

type TestimonyFormData = z.infer<typeof testimonySchema>;

export default function PublicTestimonialsPage() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TestimonyFormData>({
    resolver: zodResolver(testimonySchema),
    defaultValues: { eventIds: [] },
  });

  const toggleEvent = (id: string) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const onSubmit = async (data: TestimonyFormData) => {
    data.eventIds = selectedEvents;
    if (selectedEvents.length === 0) {
      toast.error("Select at least one event");
      return;
    }
    console.log("Testimony submitted:", data);
    toast.success("Thank you for sharing your testimony!");
    setSelectedEvents([]);
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
                <Star className="h-5 w-5 text-accent-gold" />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-xl sm:text-2xl">Share Your Testimony</CardTitle>
                <CardDescription className="mt-0.5 text-sm">
                  Tell us how Rhema Feast has impacted your life.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-4 py-6 sm:px-6 sm:py-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Which events did you attend? *
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {MOCK_EDITIONS.filter((e) => e.status !== "DRAFT").map((event) => {
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
                          <p className="mt-0.5 text-xs text-muted-foreground">{event.year}</p>
                        </div>
                        {checked && <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-gold" />}
                      </label>
                    );
                  })}
                </div>
                {errors.eventIds && (
                  <p className="text-sm text-destructive">{errors.eventIds.message}</p>
                )}
              </section>

              <section className="space-y-1.5">
                <Label htmlFor="testimony">Your Testimony *</Label>
                <Textarea
                  id="testimony"
                  rows={5}
                  className="min-h-[140px]"
                  placeholder="Share how Rhema Feast impacted you — what God did, what you learned, how your life changed..."
                  {...register("testimony")}
                />
                {errors.testimony && (
                  <p className="text-sm text-destructive">{errors.testimony.message}</p>
                )}
              </section>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting…" : "Share Testimony"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}