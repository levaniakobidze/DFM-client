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
    <Card className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <Badge variant="category">{dare.category}</Badge>
        <span className="text-lg font-bold text-amber-500">${dare.reward.toFixed(2)}</span>
      </div>
      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{dare.title}</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">{dare.description}</p>
      <div className="flex items-center justify-between mt-auto pt-2">
        <span className="text-xs text-gray-400">by {dare.createdBy}</span>
        <Link href={`/feed/${dare.id}`}>
          <Button size="sm">View Dare</Button>
        </Link>
      </div>
    </Card>
  );
}
