import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Dare } from "@/lib/mock-data";

interface DareCardProps {
  dare: Dare;
}

export default function DareCard({ dare }: DareCardProps) {
  return (
    <Card hover className="flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <Badge variant="category">{dare.category}</Badge>
        <span className="text-xl font-extrabold text-amber-500 leading-none">${dare.reward.toFixed(2)}</span>
      </div>
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug">{dare.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 line-clamp-2 flex-1 leading-relaxed">{dare.description}</p>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
        <span className="text-xs text-gray-400 dark:text-gray-500">by {dare.createdBy}</span>
        <Link href={`/feed/${dare.id}`}>
          <Button size="sm">View Dare</Button>
        </Link>
      </div>
    </Card>
  );
}
