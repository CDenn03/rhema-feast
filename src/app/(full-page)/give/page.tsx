"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Gift, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

const giveSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Valid phone number required"),
  amount: z.string().min(1, "Enter an amount"),
  paymentMethod: z.enum(["MPESA", "CARD", "BANK"]),
  message: z.string().optional(),
});

type GiveFormData = z.infer<typeof giveSchema>;

export default function GivePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GiveFormData>({
    resolver: zodResolver(giveSchema),
    defaultValues: { paymentMethod: "MPESA" },
  });

  const onSubmit = async (data: GiveFormData) => {
    console.log("Give:", data);
    toast.success("Thank you for your generous gift!");
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
                <Gift className="h-5 w-5 text-accent-gold" />
              </div>
              <div>
                <CardTitle>Give</CardTitle>
                <CardDescription>
                  Support the vision and ministry of Rhema Feast with your offering.
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
                  <Label htmlFor="amount">Amount (KES) *</Label>
                  <Input id="amount" type="number" min="1" placeholder="e.g. 1000" {...register("amount")} />
                  {errors.amount && <p className="text-sm text-destructive">{errors.amount.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method *</Label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(["MPESA", "CARD", "BANK"] as const).map((method) => (
                    <label
                      key={method}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border p-3 text-sm font-medium transition-colors has-checked:border-accent-gold has-checked:bg-accent-gold/5"
                    >
                      <input
                        type="radio"
                        value={method}
                        {...register("paymentMethod")}
                        className="h-4 w-4 text-accent-gold focus:ring-accent-gold/30"
                      />
                      {method === "MPESA" ? "M-Pesa" : method === "CARD" ? "Card" : "Bank Transfer"}
                    </label>
                  ))}
                </div>
                {errors.paymentMethod && <p className="text-sm text-destructive">{errors.paymentMethod.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (optional)</Label>
                <Textarea id="message" rows={3} placeholder="A note or prayer request..." {...register("message")} />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Processing…" : "Give Now"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
