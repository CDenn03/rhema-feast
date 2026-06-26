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
                <Star className="h-5 w-5 text-accent-gold" />
              </div>
              <div>
                <CardTitle>Share Your Testimony</CardTitle>
                <CardDescription>
                  Tell us how Rhema Feast has impacted your life.
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

              <div className="space-y-2">
                <Label>Which events did you attend? *</Label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {MOCK_EDITIONS.filter((e) => e.status !== "DRAFT").map((event) => (
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
                        <p className="text-xs text-muted-foreground mt-0.5">{event.year}</p>
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
                <Label htmlFor="testimony">Your Testimony *</Label>
                <Textarea
                  id="testimony"
                  rows={5}
                  placeholder="Share how Rhema Feast impacted you — what God did, what you learned, how your life changed..."
                  {...register("testimony")}
                />
                {errors.testimony && <p className="text-sm text-destructive">{errors.testimony.message}</p>}
              </div>

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
