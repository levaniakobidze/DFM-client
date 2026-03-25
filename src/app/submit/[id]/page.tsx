"use client";

import { use, useState } from "react";
import Link from "next/link";
import { mockDares } from "@/lib/mock-data";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";

interface Props {
  params: Promise<{ id: string }>;
}

export default function SubmitPage({ params }: Props) {
  const { id } = use(params);
  const dare = mockDares.find((d) => d.id === id);
  const [submitted, setSubmitted] = useState(false);

  if (!dare) return null;

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-4xl mb-4">⏳</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Proof Submitted!</h2>
        <p className="text-gray-500 mb-6">
          Your proof is under review. You will be notified once it is approved.
        </p>
        <Link href="/feed">
          <Button>Back to Feed</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10 space-y-5">
      <Link
        href={`/feed/${dare.id}`}
        className="text-sm text-gray-500 hover:text-gray-700 transition-colors inline-block"
      >
        ← Back to Dare
      </Link>

      <SectionTitle title="Upload Proof" subtitle="Submit your proof to claim the reward." />

      {/* Dare summary */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="category">{dare.category}</Badge>
          <span className="font-bold text-amber-500">${dare.reward.toFixed(2)}</span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">{dare.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{dare.proofRequirement}</p>
      </Card>

      {/* Upload form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="space-y-4"
      >
        <Card>
          <h3 className="font-semibold text-gray-900 mb-3">Upload File</h3>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl py-10 cursor-pointer hover:border-violet-400 transition-colors">
            <span className="text-3xl mb-2">📁</span>
            <span className="text-sm font-medium text-gray-700">Click to upload or drag and drop</span>
            <span className="text-xs text-gray-400 mt-1">Video or image accepted</span>
            <input type="file" className="hidden" accept="image/*,video/*" />
          </label>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 mb-3">Additional Notes</h3>
          <textarea
            rows={3}
            placeholder="Any context or notes for the reviewer..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
          />
        </Card>

        <Button type="submit" size="lg" className="w-full">Submit Proof</Button>
      </form>
    </div>
  );
}
