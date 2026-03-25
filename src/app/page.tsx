import Link from "next/link";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import DareCard from "@/components/dare/DareCard";
import { mockDares } from "@/lib/mock-data";

const categories = [
  { label: "Fun", icon: "😄" },
  { label: "Social", icon: "🤝" },
  { label: "Creative", icon: "🎨" },
  { label: "Video", icon: "🎥" },
  { label: "Public", icon: "🌍" },
];

const steps = [
  {
    step: "1",
    icon: "🔍",
    title: "Browse Dares",
    description: "Explore safe challenges posted by others across fun categories.",
  },
  {
    step: "2",
    icon: "⚡",
    title: "Accept & Complete",
    description: "Accept a dare, nail it, and upload your proof for review.",
  },
  {
    step: "3",
    icon: "💰",
    title: "Get Paid",
    description: "Once your proof is approved, the reward lands straight in your wallet.",
  },
];

export default function LandingPage() {
  const featured = mockDares.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-24 text-center">
          <span className="inline-flex items-center gap-1.5 bg-violet-50 text-violet-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-violet-200 mb-6">
            🔥 Live challenges available right now
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-5 leading-tight tracking-tight">
            Dare someone.<br />
            <span className="text-violet-600">Get paid</span> to do it.
          </h1>
          <p className="text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Browse safe fun challenges, accept them, upload proof, and earn real rewards.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/feed"><Button size="lg" className="px-8">Browse Dares</Button></Link>
            <Link href="/create"><Button size="lg" variant="outline" className="px-8">Post a Dare</Button></Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <SectionTitle title="How it works" subtitle="Three steps. Real rewards." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="bg-white rounded-2xl border border-gray-200 p-7 text-center">
                <div className="text-3xl mb-4">{s.icon}</div>
                <div className="w-7 h-7 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center mx-auto mb-3">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured dares */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <SectionTitle title="Featured Dares" subtitle="Jump in and start earning." />
            <Link href="/feed" className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {featured.map((dare) => (
              <DareCard key={dare.id} dare={dare} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-10">
            <SectionTitle title="Browse by Category" subtitle="Safe, fun, and for everyone." />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link key={cat.label} href={`/feed?category=${cat.label}`}>
                <span className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-all cursor-pointer">
                  <span>{cat.icon}</span>
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Ready to take the dare?</h2>
          <p className="text-gray-500 mb-10 text-lg leading-relaxed">
            Join the platform, start earning — or post your own challenge and watch people step up.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/feed"><Button size="lg" className="px-8">Browse Dares</Button></Link>
            <Link href="/create"><Button size="lg" variant="outline" className="px-8">Post a Dare</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
