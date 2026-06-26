"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import type { GuestCategory } from "@/features/guests/types";
import { Plus } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: GuestCategory[];
}

export function CategoriesDialog({ open, onOpenChange, categories }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Guest Categories</DialogTitle>
          <DialogDescription>Define classifications for special guests.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-4 rounded-2xl border bg-card p-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cat.color}/10`}>
                <span className={`text-sm font-bold ${cat.color.replace("bg-", "text-")}`}>
                  {cat.name.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{cat.name}</p>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
              </div>
              <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${cat.isActive ? "bg-accent-gold/10 text-accent-gold dark:bg-accent-gold/15 dark:text-accent-gold" : "bg-muted text-muted-foreground"}`}>
                {cat.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          ))}
        </div>

        <DialogFooter>
          <button className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            Add Category
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
