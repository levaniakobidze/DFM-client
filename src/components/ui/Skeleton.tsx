import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-md bg-gray-200", className)}>
      <div className="shimmer-effect absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-12" />
      </div>
      <Skeleton className="h-4 w-3/4 mt-1" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <div className="flex items-center justify-between pt-3">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  );
}
