import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={cn("", className)}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </div>
  );
}
