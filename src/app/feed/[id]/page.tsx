import Link from "next/link";
import { notFound } from "next/navigation";
import { mockDares } from "@/lib/mock-data";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DareDetailsPage({ params }: Props) {
  const { id } = await params;
  const dare = mockDares.find((d) => d.id === id);

  if (!dare) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link
        href="/feed"
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6 inline-block"
      >
        ← Back to Feed
      </Link>

      {/* Main info */}
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="category">{dare.category}</Badge>
          <span className="text-2xl font-bold text-amber-500">${dare.reward.toFixed(2)}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{dare.title}</h1>
        <p className="text-gray-600 leading-relaxed mb-4">{dare.description}</p>
        <p className="text-xs text-gray-400">Posted by {dare.createdBy}</p>
      </Card>

      {/* Proof requirement */}
      <Card className="mb-4">
        <h2 className="font-semibold text-gray-900 mb-2">Proof Required</h2>
        <p className="text-sm text-gray-600">{dare.proofRequirement}</p>
      </Card>

      {/* Action */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">Ready to take the dare?</p>
            <p className="text-sm text-gray-500">
              Earn <span className="text-amber-500 font-semibold">${dare.reward.toFixed(2)}</span> on completion.
            </p>
          </div>
          <Link href={`/submit/${dare.id}`}>
            <Button size="lg">Accept Dare</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
