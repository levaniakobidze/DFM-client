"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import AdminRoute from "@/components/layout/AdminRoute";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import Pagination from "@/components/ui/Pagination";
import {
  useAdminStats,
  useAdminSubmissions,
  useAdminUsers,
  useAdminDares,
  useAdminReports,
  useAdminRequests,
  useUpdateUserStatus,
  useDeleteUser,
  useUpdateSubmissionStatus,
  useUpdateDareStatus,
  useUpdateReportStatus,
} from "@/hooks/useAdmin";
import type { SubmissionStatus, ReportStatus, DareStatus, UserStatus } from "@/services/admin.service";
import { useToast } from "@/context/ToastContext";

// ── Types ──────────────────────────────────────────────────────────────────
type Tab = "overview" | "dares" | "submissions" | "users" | "reports" | "requests";

// ── Helpers ────────────────────────────────────────────────────────────────

function statusClass(s: string) {
  const k = s.toLowerCase();
  const map: Record<string, string> = {
    active:    "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400",
    open:      "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
    pending:   "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400",
    draft:     "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
    completed: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400",
    closed:    "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
    cancelled: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
    approved:  "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400",
    rejected:  "bg-red-100 dark:bg-red-900/40 text-red-500 dark:text-red-400",
    reviewed:  "bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400",
    dismissed: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
  };
  return map[k] ?? "bg-gray-100 dark:bg-gray-800 text-gray-500";
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${statusClass(status)}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

function StatCard({ icon, label, value, sub, color }: {
  icon: string; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <Card className="flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 ${color}`}>{icon}</div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{value}</p>
        {sub && <p className="text-xs text-gray-400 dark:text-gray-500">{sub}</p>}
      </div>
    </Card>
  );
}

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
        }`}>{badge}</span>
      )}
    </button>
  );
}

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

function SearchInput({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="relative flex-1 max-w-sm">
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search..."}
        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
      />
    </div>
  );
}

// ── Requests helpers ───────────────────────────────────────────────────────

function detectBrowser(ua: string | null): string {
  if (!ua) return "Unknown";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("curl")) return "curl";
  return "Browser";
}

function methodClass(method: string) {
  const map: Record<string, string> = {
    GET:    "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400",
    POST:   "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400",
    PATCH:  "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400",
    PUT:    "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400",
    DELETE: "bg-red-100 dark:bg-red-900/40 text-red-500 dark:text-red-400",
  };
  return map[method] ?? "bg-gray-100 dark:bg-gray-800 text-gray-500";
}

function statusCodeClass(code: number | null) {
  if (!code) return "text-gray-400";
  if (code < 300) return "text-emerald-500 dark:text-emerald-400 font-semibold";
  if (code < 400) return "text-blue-500 dark:text-blue-400 font-semibold";
  if (code < 500) return "text-amber-500 dark:text-amber-400 font-semibold";
  return "text-red-500 dark:text-red-400 font-semibold";
}

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ══════════════════════════════════════════════════════════════════════════
// TAB: Overview
// ══════════════════════════════════════════════════════════════════════════
function OverviewTab() {
  const { data: stats, isLoading } = useAdminStats();
  const { data: pendingData } = useAdminSubmissions({ status: "PENDING", page: 1 });
  const { data: openData }    = useAdminReports({ status: "OPEN", page: 1 });

  if (isLoading) {
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

  const pendingSubs = pendingData?.submissions ?? [];
  const openReports = openData?.reports ?? [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard icon="🎯" label="Total Dares"      value={stats.totalDares}         color="bg-violet-100 dark:bg-violet-900/40" />
        <StatCard icon="👥" label="Total Users"      value={stats.totalUsers}         color="bg-blue-100 dark:bg-blue-900/40" />
        <StatCard icon="⏳" label="Pending"          value={stats.pendingSubmissions} sub="submissions waiting" color="bg-amber-100 dark:bg-amber-900/40" />
        <StatCard icon="🚩" label="Open Reports"     value={stats.openReports}        color="bg-red-100 dark:bg-red-900/40" />
        <StatCard icon="💸" label="Rewards Paid"     value={`$${stats.totalRewardsPaid}`} color="bg-green-100 dark:bg-green-900/40" />
        <StatCard icon="⚡" label="Active This Week" value={stats.activeThisWeek}     sub="unique users" color="bg-teal-100 dark:bg-teal-900/40" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Recent Pending Submissions</h3>
          {pendingSubs.length === 0 ? (
            <Card><p className="text-sm text-gray-400 text-center py-6">No pending submissions</p></Card>
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

        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Open Reports</h3>
          {openReports.length === 0 ? (
            <Card><p className="text-sm text-gray-400 text-center py-6">No open reports</p></Card>
          ) : (
            <Card padding={false} className="overflow-hidden">
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {openReports.slice(0, 4).map((r) => (
                  <li key={r.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-sm shrink-0">🚩</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate capitalize">{r.targetType.toLowerCase()} #{r.targetId.slice(0, 8)}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{r.reportedBy} · {r.reason.slice(0, 50)}</p>
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

// ══════════════════════════════════════════════════════════════════════════
// TAB: Dares
// ══════════════════════════════════════════════════════════════════════════
function DaresTab() {
  const [page, setPage]     = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading } = useAdminDares({ page, status: status || undefined, search: debouncedSearch || undefined });
  const updateDare = useUpdateDareStatus();

  const handleSearch = (v: string) => {
    setSearch(v);
    clearTimeout((window as any).__dareSearch);
    (window as any).__dareSearch = setTimeout(() => { setDebouncedSearch(v); setPage(1); }, 400);
  };

  const statusOptions = [
    { key: "",          label: "All"       },
    { key: "ACTIVE",    label: "Active"    },
    { key: "DRAFT",     label: "Draft"     },
    { key: "CLOSED",    label: "Closed"    },
    { key: "COMPLETED", label: "Completed" },
    { key: "REJECTED",  label: "Rejected"  },
    { key: "CANCELLED", label: "Cancelled" },
  ];

  if (isLoading) return <Skeleton className="h-64 rounded-2xl" />;

  const dares = data?.dares ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={handleSearch} placeholder="Search dares..." />
        <span className="text-xs text-gray-400 dark:text-gray-500">{pagination?.total ?? 0} dares</span>
      </div>
      <FilterBar options={statusOptions} active={status} onChange={(v) => { setStatus(v); setPage(1); }} />

      {dares.length === 0 ? (
        <Card><p className="text-sm text-gray-400 text-center py-8">No dares found</p></Card>
      ) : (
        <Card padding={false} className="overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                {["Dare", "Category", "Reward", "Subs / Acc", "Status", "Creator", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {dares.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-4 py-3 max-w-[200px]">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{d.title}</p>
                    <p className="text-xs text-gray-400">{d.createdDate}</p>
                  </td>
                  <td className="px-4 py-3"><Badge variant="default">{d.category}</Badge></td>
                  <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">${d.reward}</td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-center">{d.submissions} / {d.acceptances}</td>
                  <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">{d.createdBy}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/feed/${d.id}`}><Button variant="ghost" size="sm">View</Button></Link>
                      {d.status === "ACTIVE" && (
                        <Button
                          variant="outline" size="sm"
                          className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                          onClick={() => updateDare.mutate({ id: d.id, status: "CLOSED" })}
                          disabled={updateDare.isPending}
                        >
                          Close
                        </Button>
                      )}
                      {d.status === "DRAFT" && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => updateDare.mutate({ id: d.id, status: "ACTIVE" })}
                          disabled={updateDare.isPending}
                        >
                          Activate
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      {pagination && <Pagination page={page} totalPages={pagination.totalPages} onChange={setPage} />}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// TAB: Submissions
// ══════════════════════════════════════════════════════════════════════════
function SubmissionsTab() {
  const [page, setPage]     = useState(1);
  const [status, setStatus] = useState("");

  const { data, isLoading } = useAdminSubmissions({ page, status: status || undefined });
  const updateSub = useUpdateSubmissionStatus();

  const filterOptions = [
    { key: "",         label: "All"      },
    { key: "PENDING",  label: "Pending"  },
    { key: "APPROVED", label: "Approved" },
    { key: "REJECTED", label: "Rejected" },
  ];

  if (isLoading) return <Skeleton className="h-64 rounded-2xl" />;

  const subs = data?.submissions ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <FilterBar options={filterOptions} active={status} onChange={(v) => { setStatus(v); setPage(1); }} />
        <span className="text-xs text-gray-400 dark:text-gray-500">{pagination?.total ?? 0} submissions</span>
      </div>

      {subs.length === 0 ? (
        <Card><p className="text-sm text-gray-400 text-center py-8">No submissions found</p></Card>
      ) : (
        <div className="space-y-3">
          {subs.map((s) => (
            <Card key={s.id} className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-900 dark:text-white">{s.dareTitle}</p>
                  <StatusBadge status={s.status} />
                  <span className="text-xs font-bold text-green-600 dark:text-green-400">+${s.reward}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By <span className="font-medium text-gray-700 dark:text-gray-300">{s.submittedBy}</span> · {s.date}
                </p>
                {s.notes && <p className="text-xs text-gray-500 dark:text-gray-400 italic">"{s.notes}"</p>}
                {s.proofUrl && (
                  <a href={s.proofUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-violet-500 hover:underline">
                    View proof →
                  </a>
                )}
              </div>
              {s.status === "PENDING" && (
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm" className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => updateSub.mutate({ id: s.id, status: "APPROVED" })}
                    disabled={updateSub.isPending}
                  >
                    ✓ Approve
                  </Button>
                  <Button
                    size="sm" variant="outline"
                    className="text-red-500 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20"
                    onClick={() => updateSub.mutate({ id: s.id, status: "REJECTED" })}
                    disabled={updateSub.isPending}
                  >
                    ✕ Reject
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
      {pagination && <Pagination page={page} totalPages={pagination.totalPages} onChange={setPage} />}
    </div>
  );
}

function UserStatusBadge({ status }: { status: UserStatus }) {
  const map: Record<UserStatus, string> = {
    ACTIVE:  "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400",
    PAUSED:  "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400",
    BLOCKED: "bg-red-100 dark:bg-red-900/40 text-red-500 dark:text-red-400",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${map[status]}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}

// ── User row actions: icons + menu row ───────────────────────────────────
function IconPauseMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}
function IconPlayMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7-11-7z" />
    </svg>
  );
}
function IconBlockMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path strokeLinecap="round" d="M4.93 4.93l14.14 14.14" />
    </svg>
  );
}
function IconTrashMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}
function IconChevronDownMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
function IconDotsMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="6" r="1.75" />
      <circle cx="12" cy="12" r="1.75" />
      <circle cx="12" cy="18" r="1.75" />
    </svg>
  );
}

const userActionMenuTone = {
  amber: "text-amber-700 dark:text-amber-300 hover:bg-amber-500/[0.12] focus-visible:bg-amber-500/[0.12]",
  red: "text-red-700 dark:text-red-300 hover:bg-red-500/[0.12] focus-visible:bg-red-500/[0.12]",
  green: "text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/[0.12] focus-visible:bg-emerald-500/[0.12]",
  danger: "text-red-700 dark:text-red-300 hover:bg-red-500/[0.15] focus-visible:bg-red-500/[0.15]",
} as const;

function UserActionMenuItem({
  icon,
  label,
  tone,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  tone: keyof typeof userActionMenuTone;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        role="menuitem"
        className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors outline-none ${userActionMenuTone[tone]}`}
        onClick={onClick}
      >
        <span className="shrink-0 w-5 h-5 flex items-center justify-center opacity-95">{icon}</span>
        <span className="text-left">{label}</span>
      </button>
    </li>
  );
}

type UserActionKind = "pause" | "unpause" | "block" | "unblock" | "delete";

function UserActionConfirmIcon({ kind }: { kind: UserActionKind }) {
  const wrap =
    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ring-1 ring-inset ";
  if (kind === "delete") {
    return (
      <div className={wrap + "bg-red-500/10 text-red-600 dark:text-red-400 ring-red-500/20"}>
        <IconTrashMenu className="w-6 h-6" />
      </div>
    );
  }
  if (kind === "block") {
    return (
      <div className={wrap + "bg-red-500/10 text-red-600 dark:text-red-400 ring-red-500/20"}>
        <IconBlockMenu className="w-6 h-6" />
      </div>
    );
  }
  if (kind === "pause") {
    return (
      <div className={wrap + "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20"}>
        <IconPauseMenu className="w-6 h-6" />
      </div>
    );
  }
  return (
    <div className={wrap + "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20"}>
      <IconPlayMenu className="w-6 h-6" />
    </div>
  );
}

type PendingUserAction = {
  userId: string;
  userName: string;
  kind: UserActionKind;
};

// ══════════════════════════════════════════════════════════════════════════
// TAB: Users
// ══════════════════════════════════════════════════════════════════════════
function UsersTab() {
  const [page, setPage]     = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<PendingUserAction | null>(null);

  const { data, isLoading } = useAdminUsers({ page, search: debouncedSearch || undefined });
  const updateStatus = useUpdateUserStatus();
  const deleteUser   = useDeleteUser();
  const { showToast } = useToast();

  useEffect(() => {
    if (!menuOpenId) return;
    const onDown = (e: MouseEvent) => {
      const el = document.querySelector(`[data-user-actions="${menuOpenId}"]`);
      if (el && !el.contains(e.target as Node)) setMenuOpenId(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menuOpenId]);

  const handleSearch = (v: string) => {
    setSearch(v);
    clearTimeout((window as any).__userSearch);
    (window as any).__userSearch = setTimeout(() => { setDebouncedSearch(v); setPage(1); }, 400);
  };

  const runPendingAction = () => {
    if (!pendingAction) return;
    const { userId, kind, userName } = pendingAction;

    const toastTop = (message: string, type: "success" | "error") => {
      showToast(message, type, { position: "top" });
    };

    const onFail = (err: unknown) => {
      setPendingAction(null);
      toastTop(err instanceof Error ? err.message : "Request failed", "error");
    };

    if (kind === "delete") {
      deleteUser.mutate(userId, {
        onSuccess: () => {
          setPendingAction(null);
          toastTop(`${userName} was deleted.`, "success");
        },
        onError: onFail,
      });
      return;
    }

    const status: UserStatus =
      kind === "pause" ? "PAUSED"
      : kind === "block" ? "BLOCKED"
      : "ACTIVE";

    const successByKind: Record<Exclude<UserActionKind, "delete">, string> = {
      pause: `${userName} is paused.`,
      unpause: `${userName} is active again.`,
      block: `${userName} has been blocked.`,
      unblock: `${userName} is active again.`,
    };

    updateStatus.mutate(
      { id: userId, status },
      {
        onSuccess: () => {
          setPendingAction(null);
          toastTop(successByKind[kind], "success");
        },
        onError: onFail,
      }
    );
  };

  const confirmTitle = pendingAction
    ? {
        pause: "Pause user",
        unpause: "Unpause user",
        block: "Block user",
        unblock: "Unblock user",
        delete: "Delete user",
      }[pendingAction.kind]
    : "";

  const confirmBody = pendingAction
    ? {
        pause: "This user will not be able to use the platform until unpaused.",
        unpause: "Restore full access for this user?",
        block: "This user will be blocked until you unblock them.",
        unblock: "Restore access for this blocked user?",
        delete: "This permanently removes the user and cannot be undone.",
      }[pendingAction.kind]
    : "";

  if (isLoading) return <Skeleton className="h-64 rounded-2xl" />;

  const users = data?.users ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <SearchInput value={search} onChange={handleSearch} placeholder="Search users..." />
        <span className="text-xs text-gray-400 dark:text-gray-500">{pagination?.total ?? 0} users</span>
      </div>

      {users.length === 0 ? (
        <Card><p className="text-sm text-gray-400 text-center py-8">No users found</p></Card>
      ) : (
        <Card padding={false} className="overflow-visible">
          <table className="w-full table-fixed border-collapse text-sm min-w-0">
            <colgroup>
              <col className="w-[13%]" />
              <col className="w-[26%]" />
              <col className="w-[10%]" />
              <col className="w-[6%]" />
              <col className="w-[6%]" />
              <col className="w-[7%]" />
              <col className="w-[8%]" />
              <col className="w-[9%]" />
              <col className="w-[15%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                {["User", "Email", "Joined", "Created", "Completed", "Earned", "Role", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-2 sm:px-3 py-3 text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide whitespace-nowrap min-w-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {users.map((u) => (
                <tr key={u.id} className={`hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors ${u.status !== "ACTIVE" ? "opacity-70" : ""}`}>
                  <td className="px-2 sm:px-3 py-3 min-w-0 align-middle">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 text-xs font-bold flex items-center justify-center shrink-0">
                        {u.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white truncate" title={u.name}>{u.name}</span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-3 py-3 text-gray-500 dark:text-gray-400 text-xs min-w-0 align-middle">
                    <span className="block truncate" title={u.email}>{u.email}</span>
                  </td>
                  <td className="px-2 sm:px-3 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap text-xs align-middle">{u.joinedDate}</td>
                  <td className="px-2 sm:px-3 py-3 text-gray-600 dark:text-gray-400 text-center align-middle">{u.daresCreated}</td>
                  <td className="px-2 sm:px-3 py-3 text-gray-600 dark:text-gray-400 text-center align-middle">{u.daresCompleted}</td>
                  <td className="px-2 sm:px-3 py-3 font-semibold text-green-600 dark:text-green-400 align-middle">${u.totalEarned}</td>
                  <td className="px-2 sm:px-3 py-3 min-w-0 align-middle">
                    <span className={`inline-block max-w-full truncate text-xs font-semibold px-1.5 sm:px-2 py-0.5 rounded-full ${
                      u.isAdmin
                        ? "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    }`}>
                      {u.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="px-2 sm:px-3 py-3 min-w-0 align-middle"><UserStatusBadge status={u.status} /></td>
                  <td className="px-2 sm:px-3 py-3 min-w-0 align-middle">
                    {!u.isAdmin && (
                      <div className="relative w-full max-w-full text-left" data-user-actions={u.id}>
                        <button
                          type="button"
                          className="inline-flex w-full max-w-full min-w-0 items-center gap-1 sm:gap-2 justify-between rounded-xl border border-gray-200/90 dark:border-gray-600/80 bg-linear-to-b from-white to-gray-50/90 dark:from-gray-800/90 dark:to-gray-900/90 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-100 shadow-sm hover:border-violet-400/50 dark:hover:border-violet-500/40 hover:shadow-md transition-all disabled:opacity-50"
                          onClick={() => setMenuOpenId((id) => (id === u.id ? null : u.id))}
                          disabled={updateStatus.isPending || deleteUser.isPending}
                          aria-expanded={menuOpenId === u.id}
                          aria-haspopup="menu"
                        >
                          <span className="flex items-center gap-2">
                            <IconDotsMenu className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                            Actions
                          </span>
                          <IconChevronDownMenu
                            className={`w-4 h-4 text-gray-500 transition-transform shrink-0 ${menuOpenId === u.id ? "rotate-180" : ""}`}
                          />
                        </button>
                        {menuOpenId === u.id && (
                          <ul
                            role="menu"
                            className="absolute right-0 z-30 mt-2 w-54 rounded-2xl border border-gray-200/80 dark:border-gray-600/60 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-1.5 px-1.5 shadow-xl shadow-black/10 dark:shadow-black/40 ring-1 ring-black/4 dark:ring-white/6"
                          >
                            {u.status === "ACTIVE" && (
                              <>
                                <UserActionMenuItem
                                  icon={<IconPauseMenu className="w-5 h-5" />}
                                  label="Pause"
                                  tone="amber"
                                  onClick={() => {
                                    setMenuOpenId(null);
                                    setPendingAction({ userId: u.id, userName: u.name, kind: "pause" });
                                  }}
                                />
                                <UserActionMenuItem
                                  icon={<IconBlockMenu className="w-5 h-5" />}
                                  label="Block"
                                  tone="red"
                                  onClick={() => {
                                    setMenuOpenId(null);
                                    setPendingAction({ userId: u.id, userName: u.name, kind: "block" });
                                  }}
                                />
                              </>
                            )}
                            {u.status === "PAUSED" && (
                              <>
                                <UserActionMenuItem
                                  icon={<IconPlayMenu className="w-5 h-5" />}
                                  label="Unpause"
                                  tone="green"
                                  onClick={() => {
                                    setMenuOpenId(null);
                                    setPendingAction({ userId: u.id, userName: u.name, kind: "unpause" });
                                  }}
                                />
                                <UserActionMenuItem
                                  icon={<IconBlockMenu className="w-5 h-5" />}
                                  label="Block"
                                  tone="red"
                                  onClick={() => {
                                    setMenuOpenId(null);
                                    setPendingAction({ userId: u.id, userName: u.name, kind: "block" });
                                  }}
                                />
                              </>
                            )}
                            {u.status === "BLOCKED" && (
                              <UserActionMenuItem
                                icon={<IconPlayMenu className="w-5 h-5" />}
                                label="Unblock"
                                tone="green"
                                onClick={() => {
                                  setMenuOpenId(null);
                                  setPendingAction({ userId: u.id, userName: u.name, kind: "unblock" });
                                }}
                              />
                            )}
                            <li className="my-1 h-px bg-gray-200/90 dark:bg-gray-700/80 mx-1" aria-hidden />
                            <UserActionMenuItem
                              icon={<IconTrashMenu className="w-5 h-5" />}
                              label="Delete"
                              tone="danger"
                              onClick={() => {
                                setMenuOpenId(null);
                                setPendingAction({ userId: u.id, userName: u.name, kind: "delete" });
                              }}
                            />
                          </ul>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      {pagination && <Pagination page={page} totalPages={pagination.totalPages} onChange={setPage} />}

      {pendingAction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="user-action-confirm-title"
          onClick={() => setPendingAction(null)}
        >
          <Card
            className="max-w-md w-full shadow-2xl border-gray-200/80 dark:border-gray-600/60"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-4">
              <UserActionConfirmIcon kind={pendingAction.kind} />
              <div className="min-w-0 flex-1">
                <h3 id="user-action-confirm-title" className="text-lg font-semibold text-gray-900 dark:text-white leading-snug">
                  {confirmTitle}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{pendingAction.userName}</span>
                  <span className="text-gray-400 dark:text-gray-500"> · </span>
                  {confirmBody}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2 flex-wrap">
              <Button
                type="button"
                variant="outline"
                onClick={() => setPendingAction(null)}
                disabled={updateStatus.isPending || deleteUser.isPending}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className={
                  pendingAction.kind === "delete"
                    ? "bg-red-600 hover:bg-red-700 text-white border-transparent"
                    : pendingAction.kind === "block"
                      ? "bg-red-600 hover:bg-red-700 text-white border-transparent"
                      : ""
                }
                onClick={runPendingAction}
                disabled={updateStatus.isPending || deleteUser.isPending}
              >
                {pendingAction.kind === "delete" ? "Delete" : "Confirm"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// TAB: Reports
// ══════════════════════════════════════════════════════════════════════════
function ReportsTab() {
  const [page, setPage]     = useState(1);
  const [status, setStatus] = useState("");

  const { data, isLoading } = useAdminReports({ page, status: status || undefined });
  const updateReport = useUpdateReportStatus();

  const filterOptions = [
    { key: "",          label: "All"       },
    { key: "OPEN",      label: "Open"      },
    { key: "REVIEWED",  label: "Reviewed"  },
    { key: "DISMISSED", label: "Dismissed" },
  ];

  if (isLoading) return <Skeleton className="h-64 rounded-2xl" />;

  const reports = data?.reports ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <FilterBar options={filterOptions} active={status} onChange={(v) => { setStatus(v); setPage(1); }} />
        <span className="text-xs text-gray-400 dark:text-gray-500">{pagination?.total ?? 0} reports</span>
      </div>

      {reports.length === 0 ? (
        <Card><p className="text-sm text-gray-400 text-center py-8">No reports found</p></Card>
      ) : (
        <div className="space-y-3">
          {reports.map((r) => (
            <Card key={r.id} className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-base shrink-0">🚩</div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{r.targetType}</span>
                  <span className="text-xs text-gray-400 font-mono">#{r.targetId.slice(0, 8)}</span>
                  <StatusBadge status={r.status} />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Reported by <span className="font-medium text-gray-700 dark:text-gray-300">{r.reportedBy}</span> · {r.date}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{r.reason}</p>
              </div>
              {r.status === "OPEN" && (
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <Button
                    size="sm" className="bg-teal-600 hover:bg-teal-700 text-white"
                    onClick={() => updateReport.mutate({ id: r.id, status: "REVIEWED" })}
                    disabled={updateReport.isPending}
                  >
                    Review
                  </Button>
                  <Button
                    size="sm" variant="outline"
                    onClick={() => updateReport.mutate({ id: r.id, status: "DISMISSED" })}
                    disabled={updateReport.isPending}
                  >
                    Dismiss
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
      {pagination && <Pagination page={page} totalPages={pagination.totalPages} onChange={setPage} />}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// TAB: Requests
// ══════════════════════════════════════════════════════════════════════════
function RequestsTab() {
  const [page, setPage]           = useState(1);
  const [method, setMethod]       = useState("");
  const [statusGroup, setStatusGroup] = useState("");
  const [search, setSearch]       = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading } = useAdminRequests({
    page,
    method: method || undefined,
    statusGroup: statusGroup || undefined,
    search: debouncedSearch || undefined,
  });

  const handleSearch = (v: string) => {
    setSearch(v);
    clearTimeout((window as any).__reqSearch);
    (window as any).__reqSearch = setTimeout(() => { setDebouncedSearch(v); setPage(1); }, 400);
  };

  const methodOptions = [
    { key: "",       label: "All Methods" },
    { key: "GET",    label: "GET"         },
    { key: "POST",   label: "POST"        },
    { key: "PATCH",  label: "PATCH"       },
    { key: "PUT",    label: "PUT"         },
    { key: "DELETE", label: "DELETE"      },
  ];

  const statusGroupOptions = [
    { key: "",             label: "All Status"   },
    { key: "success",      label: "2xx Success"  },
    { key: "redirect",     label: "3xx Redirect" },
    { key: "client_error", label: "4xx Error"    },
    { key: "server_error", label: "5xx Error"    },
  ];

  const requests = data?.requests ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-4">
      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput value={search} onChange={handleSearch} placeholder="Search path or user..." />
        <span className="text-xs text-gray-400 dark:text-gray-500">{pagination?.total ?? 0} requests</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterBar options={methodOptions} active={method} onChange={(v) => { setMethod(v); setPage(1); }} />
        <FilterBar options={statusGroupOptions} active={statusGroup} onChange={(v) => { setStatusGroup(v); setPage(1); }} />
      </div>

      {isLoading ? (
        <Skeleton className="h-64 rounded-2xl" />
      ) : requests.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl mx-auto mb-4">📡</div>
            <p className="text-sm text-gray-400">No requests match your filters</p>
          </div>
        </Card>
      ) : (
        <Card padding={false} className="overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {requests.map((r) => (
              <div key={r.id} className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group">
                {/* Method badge */}
                <span className={`shrink-0 mt-0.5 inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold font-mono uppercase ${methodClass(r.method)}`}>
                  {r.method}
                </span>

                {/* Path + meta */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-mono text-gray-900 dark:text-white truncate">{r.path}</p>
                  <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                    {r.username ? (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        👤 <span className="font-medium text-gray-700 dark:text-gray-300">{r.username}</span>
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Anonymous</span>
                    )}
                    {r.ip && (
                      <span className="text-xs text-gray-400 font-mono">{r.ip}</span>
                    )}
                    <span className="text-xs text-gray-400">
                      {detectBrowser(r.userAgent)}
                    </span>
                    {r.duration !== null && (
                      <span className={`text-xs font-medium ${r.duration > 1000 ? "text-amber-500" : "text-gray-400"}`}>
                        {r.duration}ms
                      </span>
                    )}
                  </div>
                </div>

                {/* Status code + time */}
                <div className="shrink-0 text-right">
                  <span className={`text-sm font-mono ${statusCodeClass(r.statusCode)}`}>
                    {r.statusCode ?? "—"}
                  </span>
                  <p className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">{relativeTime(r.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
      {pagination && <Pagination page={page} totalPages={pagination.totalPages} onChange={setPage} />}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════
function AdminContent() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { data: stats } = useAdminStats();

  const tabs: { key: Tab; label: string; icon: string; badge?: number }[] = [
    { key: "overview",    label: "Overview",    icon: "📊" },
    { key: "dares",       label: "Dares",        icon: "🎯" },
    { key: "submissions", label: "Submissions",  icon: "📋", badge: stats?.pendingSubmissions },
    { key: "users",       label: "Users",        icon: "👥" },
    { key: "reports",     label: "Reports",      icon: "🚩", badge: stats?.openReports },
    { key: "requests",    label: "Requests",     icon: "📡" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white text-lg">🛡️</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Site overview and moderation tools</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1">
        {tabs.map(({ key, label, icon, badge }) => (
          <TabBtn key={key} active={activeTab === key} onClick={() => setActiveTab(key)} badge={badge}>
            <span>{icon}</span> {label}
          </TabBtn>
        ))}
      </div>

      {activeTab === "overview"    && <OverviewTab />}
      {activeTab === "dares"       && <DaresTab />}
      {activeTab === "submissions" && <SubmissionsTab />}
      {activeTab === "users"       && <UsersTab />}
      {activeTab === "reports"     && <ReportsTab />}
      {activeTab === "requests"    && <RequestsTab />}
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
