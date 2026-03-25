import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";
import EmptyState from "@/components/ui/EmptyState";
import { CardSkeleton } from "@/components/ui/Skeleton";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-14">

      <SectionTitle
        title="UI Components — Phase 1"
        subtitle="Foundation components. This page will be replaced by the landing page in Phase 2."
      />

      {/* Buttons */}
      <section className="space-y-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Buttons</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Accept Dare</Button>
          <Button variant="secondary">Browse</Button>
          <Button variant="outline">Create Dare</Button>
          <Button variant="ghost">Sign In</Button>
          <Button variant="danger">Cancel</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="lg">Large CTA</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Badges</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="category">Fun</Badge>
          <Badge variant="category">Social</Badge>
          <Badge variant="category">Creative</Badge>
          <Badge variant="category">Video</Badge>
          <Badge variant="reward">$25.00</Badge>
          <Badge variant="success">Completed</Badge>
          <Badge variant="pending">Pending Review</Badge>
          <Badge variant="danger">Expired</Badge>
          <Badge>Default</Badge>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Dare Cards</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <Badge variant="category" className="mb-3">Fun</Badge>
            <h3 className="font-semibold text-gray-900 mb-1">Eat a spoonful of hot sauce</h3>
            <p className="text-sm text-gray-500 mb-4">
              Film yourself eating a full teaspoon of your spiciest hot sauce without drinking anything.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-amber-500">$15.00</span>
              <Button size="sm">Accept</Button>
            </div>
          </Card>

          <Card>
            <Badge variant="category" className="mb-3">Social</Badge>
            <h3 className="font-semibold text-gray-900 mb-1">Compliment 5 strangers</h3>
            <p className="text-sm text-gray-500 mb-4">
              Record yourself giving genuine compliments to 5 different strangers in a public place.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-amber-500">$30.00</span>
              <Button size="sm">Accept</Button>
            </div>
          </Card>

          <Card>
            <Badge variant="category" className="mb-3">Creative</Badge>
            <h3 className="font-semibold text-gray-900 mb-1">Draw a portrait in 60 seconds</h3>
            <p className="text-sm text-gray-500 mb-4">
              Draw a recognisable portrait of any person and submit a photo of the final result.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-amber-500">$10.00</span>
              <Button size="sm">Accept</Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Skeletons */}
      <section className="space-y-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Loading Skeletons</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </section>

      {/* Empty State */}
      <section className="space-y-3">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Empty State</p>
        <Card>
          <EmptyState
            title="No dares found"
            description="Be the first to create a dare in this category and start earning."
            action={<Button>Create a Dare</Button>}
          />
        </Card>
      </section>

    </div>
  );
}
