"use client";

import { useState } from "react";
import Link from "next/link";
import AdminRoute from "@/components/layout/AdminRoute";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useAdminStats, useAdminSubmissions, useAdminUsers, useAdminDares, useAdminReports } from "@/hooks/useAdmin";
import type { SubmissionStatus, ReportStatus, AdminDare } from "@/services/admin.service";

// ── Types ──────────────────────────────────────────────────
type Tab = "overview" | "dares" | "submissions" | "users" | "reports";
type SubFilter = "all" | SubmissionStatus | ReportStatus | "open";

// ── Helpers ────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    open:      "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
    pending:   "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400",
    completed: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400",
    expired:   "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
    approved:  "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400",
    rejected:  "bg-red-100 dark:bg-red-900/40 text-red-500 dark:text-red-400",
    resolved:  "bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400",
    dismissed: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
  };
  const label: Record<string, string> = {
    open: "Open", pending: "Pending", completed: "Completed", expired: "Expired",
    approved: "Approved", rejected: "Rejected", resolved: "Resolved", dismissed: "Dismissed",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${map[status] ?? map.open}`}>
      {label[status] ?? status}
    </span>
  );
}

// ── Stat card ──────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color }: {
  icon: string; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <Card className="flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${color}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{value}</p>
        {sub && <p className="text-xs text-gray-400 dark:text-gray-500">{sub}</p>}
      </div>
    </Card>
  );
}

// ── Tab button ─────────────────────────────────────────────
function TabBtn({ active, onClick, children, badge }: {
  active: boolean; onClick: () => void; children: React.ReactNode; badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
        active
          ? "bg-violet-600 text-white shadow-md shadow-violet-900/20"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      {children}
      {badge !== undefined && badge > 0 && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
          active ? "bg-white/30 text-white" : "bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400"
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

// ── Filter pill bar ────────────────────────────────────────
function FilterBar({ options, active, onChange }: {
  options: { key: string; label: string }[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit flex-wrap">
      {options.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
            active === key
              ? "bg-white dark:bg-gray-700 text-violet-600 dark:text-violet-400 shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// TAB: Overview
// ══════════════════════════════════════════════════════════
function OverviewTab() {
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: subs } = useAdminSubmissions();
  const { data: reports } = useAdminReports();

  const pendingSubs = subs?.filter((s) => s.status === "pending") ?? [];
  const openReports = reports?.filter((r) => r.status === "open") ?? [];

  if (statsLoading) {
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-20 rounded-2xl" />)}
        </div>
        <Skeleton className="h-48 rounded-2xl" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon="🎯" label="Total Dares"       value={stats.totalDares}                      color="bg-violet-100 dark:bg-violet-900/40" />
        <StatCard icon="👥" label="Total Users"       value={stats.totalUsers}                      color="bg-blue-100 dark:bg-blue-900/40" />
        <StatCard icon="⏳" label="Pending"           value={stats.pendingSubmissions} sub="submissions waiting" color="bg-amber-100 dark:bg-amber-900/40" />
        <StatCard icon="🚩" label="Open Reports"      value={stats.openReports}                     color="bg-red-100 dark:bg-red-900/40" />
        <StatCard icon="💸" label="Rewards Paid"      value={`$${stats.totalRewardsPaid}`}          color="bg-green-100 dark:bg-green-900/40" />
        <StatCard icon="⚡" label="Active This Week"  value={stats.activeThisWeek} sub="unique users"  color="bg-teal-100 dark:bg-teal-900/40" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pending submissions preview */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Recent Pending Submissions</h3>
          {pendingSubs.length === 0 ? (
            <Card><p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">No pending submissions</p></Card>
          ) : (
            <Card padding={false} className="overflow-hidden">
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {pendingSubs.slice(0, 4).map((s) => (
                  <li key={s.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-sm shrink-0">⏳</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{s.dareTitle}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{s.submittedBy} · {s.date}</p>
                    </div>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400 shrink-0">+${s.reward}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Open reports preview */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Open Reports</h3>
          {openReports.length === 0 ? (
            <Card><p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">No open reports</p></Card>
          ) : (
            <Card padding={false} className="overflow-hidden">
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {openReports.slice(0, 4).map((r) => (
                  <li key={r.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-sm shrink-0">🚩</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{r.dareTitle}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{r.reportedBy} · {r.reason.slice(0, 40)}…</p>
                    </div>
                    <StatusBadge status={r.status} />
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// TAB: Dares
// ══════════════════════════════════════════════════════════
function DaresTab() {
  const { data: dares, isLoading } = useAdminDares();
  const [search, setSearch] = useState("");
  const [expiredIds, setExpiredIds] = useState<Set<string>>(new Set());

  const expire = (id: string) => setExpiredIds((prev) => new Set([...prev, id]));

  const filtered = (dares ?? []).filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.createdBy.toLowerCase().includes(search.toLowerCase())
  );

  const getEffectiveStatus = (d: AdminDare) =>
    expiredIds.has(d.id) ? "expired" : d.status;

  if (isLoading) return <Skeleton className="h-64 rounded-2xl" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dares..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
          />
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">{filtered.length} dares</span>
      </div>

      {filtered.length === 0 ? (
        <Card><p className="text-sm text-gray-400 text-center py-8">No dares found</p></Card>
      ) : (
        <Card padding={false} className="overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                {["Dare", "Category", "Reward", "Submissions", "Status", "Creator", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((d) => {
                const eff = getEffectiveStatus(d);
                return (
                  <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="px-4 py-3 max-w-[220px]">
                      <p className="font-medium text-gray-900 dark:text-white truncate">{d.title}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{d.createdDate}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="default">{d.category}</Badge>
                    </td>
                    <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">${d.reward}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{d.submissions}</td>
                    <td className="px-4 py-3"><StatusBadge status={eff} /></td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{d.createdBy}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/feed/${d.id}`}>
                          <Button variant="ghost" size="sm">View</Button>
                        </Link>
                        {eff === "open" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                            onClick={() => expire(d.id)}
                          >
                            Expire
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// TAB: Submissions
// ══════════════════════════════════════════════════════════
function SubmissionsTab() {
  const { data: subs, isLoading } = useAdminSubmissions();
  const [filter, setFilter] = useState<SubFilter>("all");
  const [statuses, setStatuses] = useState<Record<string, SubmissionStatus>>({});

  const approve = (id: string) => setStatuses((p) => ({ ...p, [id]: "approved" }));
  const reject  = (id: string) => setStatuses((p) => ({ ...p, [id]: "rejected"  }));

  const getStatus = (id: string, base: SubmissionStatus): SubmissionStatus => statuses[id] ?? base;

  const filtered = (subs ?? []).filter((s) => {
    const eff = getStatus(s.id, s.status);
    return filter === "all" || eff === filter;
  });

  if (isLoading) return <Skeleton className="h-64 rounded-2xl" />;

  const filterOptions = [
    { key: "all",      label: "All"      },
    { key: "pending",  label: "Pending"  },
    { key: "approved", label: "Approved" },
    { key: "rejected", label: "Rejected" },
  ];

  return (
    <div className="space-y-4">
      <FilterBar options={filterOptions} active={filter} onChange={(v) => setFilter(v as SubFilter)} />

      {filtered.length === 0 ? (
        <Card><p className="text-sm text-gray-400 text-center py-8">No submissions found</p></Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((s) => {
            const eff = getStatus(s.id, s.status);
            return (
              <Card key={s.id} className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-900 dark:text-white">{s.dareTitle}</p>
                    <StatusBadge status={eff} />
                    <span className="text-xs font-bold text-green-600 dark:text-green-400">+${s.reward}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Submitted by <span className="font-medium text-gray-700 dark:text-gray-300">{s.submittedBy}</span> · {s.date}
                  </p>
                  {s.notes && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">"{s.notes}"</p>
                  )}
                </div>
                {eff === "pending" && (
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => approve(s.id)}
                    >
                      ✓ Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                      onClick={() => reject(s.id)}
                    >
                      ✕ Reject
                    </Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// TAB: Users
// ══════════════════════════════════════════════════════════
function UsersTab() {
  const { data: users, isLoading } = useAdminUsers();
  const [search, setSearch] = useState("");
  const [bannedIds, setBannedIds] = useState<Set<string>>(new Set());

  const ban = (id: string) => setBannedIds((prev) => new Set([...prev, id]));

  const filtered = (users ?? []).filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <Skeleton className="h-64 rounded-2xl" />;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
          />
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">{filtered.length} users</span>
      </div>

      {filtered.length === 0 ? (
        <Card><p className="text-sm text-gray-400 text-center py-8">No users found</p></Card>
      ) : (
        <Card padding={false} className="overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                {["User", "Email", "Joined", "Created", "Completed", "Earned", "Role", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((u) => (
                <tr key={u.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors ${bannedIds.has(u.id) ? "opacity-40" : ""}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 text-xs font-bold flex items-center justify-center shrink-0">
                        {u.name.charAt(0)}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white whitespace-nowrap">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{u.email}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">{u.joinedDate}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-center">{u.daresCreated}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-center">{u.daresCompleted}</td>
                  <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">${u.totalEarned}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      u.role === "admin"
                        ? "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    }`}>
                      {u.role === "admin" ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.role !== "admin" && !bannedIds.has(u.id) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20 whitespace-nowrap"
                        onClick={() => ban(u.id)}
                      >
                        Ban
                      </Button>
                    )}
                    {bannedIds.has(u.id) && (
                      <span className="text-xs text-red-400 font-medium">Banned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// TAB: Reports
// ══════════════════════════════════════════════════════════
function ReportsTab() {
  const { data: reports, isLoading } = useAdminReports();
  const [filter, setFilter] = useState<SubFilter>("all");
  const [statuses, setStatuses] = useState<Record<string, ReportStatus>>({});

  const resolve  = (id: string) => setStatuses((p) => ({ ...p, [id]: "resolved"  }));
  const dismiss  = (id: string) => setStatuses((p) => ({ ...p, [id]: "dismissed" }));

  const getStatus = (id: string, base: ReportStatus): ReportStatus => statuses[id] ?? base;

  const filtered = (reports ?? []).filter((r) => {
    const eff = getStatus(r.id, r.status);
    return filter === "all" || eff === filter;
  });

  if (isLoading) return <Skeleton className="h-64 rounded-2xl" />;

  const filterOptions = [
    { key: "all",       label: "All"       },
    { key: "open",      label: "Open"      },
    { key: "resolved",  label: "Resolved"  },
    { key: "dismissed", label: "Dismissed" },
  ];

  return (
    <div className="space-y-4">
      <FilterBar options={filterOptions} active={filter} onChange={(v) => setFilter(v as SubFilter)} />

      {filtered.length === 0 ? (
        <Card><p className="text-sm text-gray-400 text-center py-8">No reports found</p></Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => {
            const eff = getStatus(r.id, r.status);
            return (
              <Card key={r.id} className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-base shrink-0">
                  🚩
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-900 dark:text-white">{r.dareTitle}</p>
                    <StatusBadge status={eff} />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Reported by <span className="font-medium text-gray-700 dark:text-gray-300">{r.reportedBy}</span> · {r.date}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{r.reason}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <Link href={`/feed/${r.dareId}`}>
                    <Button variant="ghost" size="sm">View Dare</Button>
                  </Link>
                  {eff === "open" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-teal-600 hover:bg-teal-700 text-white"
                        onClick={() => resolve(r.id)}
                      >
                        Resolve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => dismiss(r.id)}
                      >
                        Dismiss
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════
function AdminContent() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { data: stats } = useAdminStats();

  const tabs: { key: Tab; label: string; icon: string; badge?: number }[] = [
    { key: "overview",     label: "Overview",     icon: "📊" },
    { key: "dares",        label: "Dares",         icon: "🎯" },
    { key: "submissions",  label: "Submissions",   icon: "📋", badge: stats?.pendingSubmissions },
    { key: "users",        label: "Users",         icon: "👥" },
    { key: "reports",      label: "Reports",       icon: "🚩", badge: stats?.openReports },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white text-lg">
          🛡️
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Site overview and moderation tools</p>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1 flex-wrap">
        {tabs.map(({ key, label, icon, badge }) => (
          <TabBtn key={key} active={activeTab === key} onClick={() => setActiveTab(key)} badge={badge}>
            <span>{icon}</span> {label}
          </TabBtn>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview"    && <OverviewTab    />}
      {activeTab === "dares"       && <DaresTab       />}
      {activeTab === "submissions" && <SubmissionsTab />}
      {activeTab === "users"       && <UsersTab       />}
      {activeTab === "reports"     && <ReportsTab     />}
    </div>
  );
}

export default function AdminPage() {
  return (
    <AdminRoute>
      <AdminContent />
    </AdminRoute>
  );
}
