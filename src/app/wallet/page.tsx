import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";

const transactions = [
  { id: "1", label: "Eat a spoonful of hot sauce", amount: 15, date: "Mar 24, 2026", type: "earned" },
  { id: "2", label: "Compliment 5 strangers", amount: 30, date: "Mar 20, 2026", type: "earned" },
  { id: "3", label: "Payout to bank", amount: -40, date: "Mar 18, 2026", type: "payout" },
  { id: "4", label: "Draw a portrait in 60 seconds", amount: 10, date: "Mar 15, 2026", type: "earned" },
  { id: "5", label: "Learn and perform a magic trick", amount: 25, date: "Mar 10, 2026", type: "earned" },
];

export default function WalletPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <SectionTitle title="Wallet" subtitle="Your balance and transactions." />

      {/* Balance card */}
      <div className="bg-violet-600 rounded-2xl p-6 text-white">
        <p className="text-sm opacity-75 mb-1">Available Balance</p>
        <p className="text-4xl font-bold mb-5">$15.00</p>
        <Button variant="secondary" size="sm">Request Payout</Button>
      </div>

      {/* Pending rewards */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-900">Pending Rewards</p>
            <p className="text-xs text-gray-500 mt-0.5">Awaiting proof approval</p>
          </div>
          <span className="text-2xl font-bold text-amber-500">$30.00</span>
        </div>
      </Card>

      {/* Transaction history */}
      <div>
        <SectionTitle title="Transaction History" className="mb-4" />
        <Card padding={false}>
          <ul className="divide-y divide-gray-100">
            {transactions.map((tx) => (
              <li key={tx.id} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-gray-900">{tx.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{tx.date}</p>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    tx.amount > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
