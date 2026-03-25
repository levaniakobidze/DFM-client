import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import DareCard from "@/components/dare/DareCard";
import { mockDares } from "@/lib/mock-data";

const categories = ["Fun", "Social", "Creative", "Video", "Public"];

const steps = [
  {
    step: "1",
    title: "Browse Dares",
    description: "Explore safe challenges posted by other users across different categories.",
  },
  {
    step: "2",
    title: "Accept & Complete",
    description: "Accept a dare, complete it, and upload your proof for review.",
  },
  {
    step: "3",
    title: "Get Paid",
    description: "Once your proof is approved, the reward lands in your wallet.",
  },
];

export default function LandingPage() {
  const featured = mockDares.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <Badge variant="category" className="mb-5">🔥 Live challenges available</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Dare someone.<br />Get paid to do it.
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
            Browse safe fun challenges, accept them, upload proof, and earn real rewards. No nonsense, just dares.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/feed"><Button size="lg">Browse Dares</Button></Link>
            <Link href="/create"><Button size="lg" variant="outline">Create a Dare</Button></Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle title="How it works" subtitle="Three simple steps." className="text-center mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 font-bold flex items-center justify-center mx-auto mb-4">
                  {s.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured dares */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <SectionTitle title="Featured Dares" subtitle="Jump in and start earning." />
            <Link href="/feed" className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {featured.map((dare) => (
              <DareCard key={dare.id} dare={dare} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <SectionTitle title="Browse by Category" subtitle="Safe and fun for everyone." className="mb-8" />
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link key={cat} href={`/feed?category=${cat}`}>
                <span className="inline-block bg-white border border-gray-200 rounded-full px-5 py-2 text-sm font-medium text-gray-700 hover:border-violet-400 hover:text-violet-600 transition-colors cursor-pointer">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to take the dare?</h2>
          <p className="text-gray-500 mb-8">
            Join the platform and start earning — or post your own challenge.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/feed"><Button size="lg">Browse Dares</Button></Link>
            <Link href="/create"><Button size="lg" variant="outline">Post a Dare</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
