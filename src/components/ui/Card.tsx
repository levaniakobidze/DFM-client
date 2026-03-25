import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: boolean;
  hover?: boolean;
}

export default function Card({ padding = true, hover = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-gray-200 shadow-sm",
        padding && "p-5",
        hover && "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
