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

const QUICK_AMOUNTS = ["500", "1000", "2500", "5000"];

export default function GivePage() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<GiveFormData>({
    resolver: zodResolver(giveSchema),
    defaultValues: { paymentMethod: "MPESA" },
  });

  const amount = watch("amount");

  const onSubmit = async (data: GiveFormData) => {
    console.log("Give:", data);
    toast.success("Thank you for your generous gift!");
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
                <Gift className="h-5 w-5 text-accent-gold" />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-xl sm:text-2xl">Give</CardTitle>
                <CardDescription className="mt-0.5 text-sm">
                  Support the vision and ministry of Rhema Feast with your offering.
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
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" type="tel" placeholder="+254 7XX XXX XXX" {...register("phone")} />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Amount (KES) *
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {QUICK_AMOUNTS.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setValue("amount", val, { shouldValidate: true })}
                      className={`rounded-lg border p-2 text-sm font-medium transition-colors ${
                        amount === val
                          ? "border-accent-gold bg-accent-gold/5 text-accent-gold"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  placeholder="Or enter a custom amount"
                  {...register("amount")}
                />
                {errors.amount && (
                  <p className="text-sm text-destructive">{errors.amount.message}</p>
                )}
              </section>

              <section className="space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Payment method *
                </h3>
                <div className="grid gap-2 sm:grid-cols-3">
                  {(["MPESA", "CARD", "BANK"] as const).map((method) => (
                    <label
                      key={method}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-border p-3 text-sm font-medium transition-colors has-checked:border-accent-gold has-checked:bg-accent-gold/5 has-checked:text-accent-gold"
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
                {errors.paymentMethod && (
                  <p className="text-sm text-destructive">{errors.paymentMethod.message}</p>
                )}
              </section>

              <section className="space-y-1.5">
                <Label htmlFor="message">Message (optional)</Label>
                <Textarea id="message" rows={3} placeholder="A note or prayer request..." {...register("message")} />
              </section>

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