import * as React from "react";
import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 rounded border-border text-accent-gold focus:ring-accent-gold/30 focus:ring-2 focus:ring-offset-1 focus:outline-none",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
