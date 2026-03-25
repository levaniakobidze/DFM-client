import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";
import DareCard from "@/components/dare/DareCard";
import { mockDares } from "@/lib/mock-data";

const stats = [
  { label: "Dares Created", value: "8" },
  { label: "Completed", value: "12" },
  { label: "Total Earned", value: "$245" },
  { label: "Success Rate", value: "92%" },
];

const recentActivity = [
  { id: "1", label: "Completed: Eat a spoonful of hot sauce", time: "2 hours ago", type: "success" },
  { id: "2", label: "Posted: Draw a portrait in 60 seconds", time: "Yesterday", type: "category" },
  { id: "3", label: "Proof under review: Compliment 5 strangers", time: "2 days ago", type: "pending" },
] as const;

export default function ProfilePage() {
  const createdDares = mockDares.slice(0, 2);
  const completedDares = mockDares.slice(2, 4);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

      {/* Profile header */}
      <Card>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-2xl font-bold flex-shrink-0">
            A
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Alex M.</h1>
            <p className="text-sm text-gray-500">Member since March 2026</p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Created dares */}
      <div>
        <SectionTitle title="Created Dares" className="mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {createdDares.map((dare) => (
            <DareCard key={dare.id} dare={dare} />
          ))}
        </div>
      </div>

      {/* Completed dares */}
      <div>
        <SectionTitle title="Completed Dares" className="mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {completedDares.map((dare) => (
            <Card key={dare.id}>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="category">{dare.category}</Badge>
                <Badge variant="success">Completed</Badge>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{dare.title}</h3>
              <p className="text-sm font-semibold text-amber-500">+${dare.reward.toFixed(2)} earned</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <SectionTitle title="Recent Activity" className="mb-4" />
        <Card padding={false}>
          <ul className="divide-y divide-gray-100">
            {recentActivity.map((item) => (
              <li key={item.id} className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <Badge variant={item.type}>{item.type === "success" ? "Done" : item.type === "pending" ? "Pending" : "New"}</Badge>
                  <p className="text-sm text-gray-700">{item.label}</p>
                </div>
                <p className="text-xs text-gray-400 shrink-0 ml-4">{item.time}</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

    </div>
  );
}
