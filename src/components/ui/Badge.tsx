import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "category" | "success" | "pending" | "danger" | "reward";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:  "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  category: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
  success:  "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  pending:  "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
  danger:   "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  reward:   "bg-amber-400 text-amber-950 font-semibold",
};

export default function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
