"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { GuestCategory } from "@/features/guests/types";
import { createGuestInviteAction } from "@/features/guests/actions";

interface Props {
  eventId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  categories: GuestCategory[];
}

export function CreateInviteDialog({ eventId, open, onOpenChange, onSuccess, categories }: Props) {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id ?? "");
  const [zoneId, setZoneId] = useState("zone_vip");
  const [maxPlusOnes, setMaxPlusOnes] = useState(2);
  const [sending, setSending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const selectedCategory = categories.find((c) => c.id === categoryId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const formData = new FormData(e.target as HTMLFormElement);
    formData.set("eventId", eventId);
    if (selectedCategory) {
      formData.set("categoryName", selectedCategory.name);
    }

    const result = await createGuestInviteAction(formData);

    setSending(false);

    if (result.success) {
      toast.success("Invite sent", {
        description: `Invitation sent to ${name} at ${email}`,
      });
      formRef.current?.reset();
      setTitle("");
      setName("");
      setEmail("");
      setPhone("");
      setOrganization("");
      setCategoryId(categories[0]?.id ?? "");
      setZoneId("zone_vip");
      setMaxPlusOnes(2);
      onSuccess?.();
      onOpenChange(false);
    } else {
      toast.error("Failed to send invite", {
        description: result.error ?? "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>New Guest Invite</DialogTitle>
          <DialogDescription>Create a special guest invitation for this event.</DialogDescription>
        </DialogHeader>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <select
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
              >
                <option value="">-- None --</option>
                <option value="Rev.">Rev.</option>
                <option value="Pastor">Pastor</option>
                <option value="Apostle">Apostle</option>
                <option value="Bishop">Bishop</option>
                <option value="Dr.">Dr.</option>
                <option value="Prof.">Prof.</option>
                <option value="Hon.">Hon.</option>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="Eng.">Eng.</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. David Mwangi"
                className="w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="guest@example.com"
                className="w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <input
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254 712 345 678"
                className="w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium">Organization</label>
              <input
                name="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. Organization name"
                className="w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select
                name="categoryId"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Zone</label>
              <select
                name="zoneId"
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                className="w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
              >
                <option value="zone_vip">VIP Section</option>
                <option value="zone_balcony">Balcony</option>
                <option value="zone_main">Main Hall</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Companions</label>
              <input
                type="number"
                name="maxPlusOnes"
                value={maxPlusOnes}
                onChange={(e) => setMaxPlusOnes(Number(e.target.value))}
                min={0}
                max={10}
                className="w-full rounded-xl border bg-card px-4 py-2.5 text-sm outline-none transition-colors focus:border-ring focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>

          <DialogFooter>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-accent-gold px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-gold/90 disabled:opacity-50"
            >
              {sending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending...
                </>
              ) : (
                "Send Invite"
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
