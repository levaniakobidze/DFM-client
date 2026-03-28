"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import { Skeleton } from "@/components/ui/Skeleton";
import Pagination from "@/components/ui/Pagination";
import { useLanguage } from "@/context/LanguageContext";
import {
  useMyProfile, useUpdateProfile,
  useMyDares, useMyAcceptances, useMyActivity,
} from "@/hooks/useProfile";
import type { ProfileDare, ProfileAcceptance } from "@/services/profile.service";

// ── Helpers ────────────────────────────────────────────────────────────────

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d === 1) return "yesterday";
  return `${d}d ago`;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// ── Dare card (profile variant) ────────────────────────────────────────────

function ProfileDareCard({ dare }: { dare: ProfileDare }) {
  const statusClass: Record<string, string> = {
    ACTIVE:    "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400",
    DRAFT:     "bg-gray-100 dark:bg-gray-800 text-gray-500",
    CLOSED:    "bg-gray-100 dark:bg-gray-800 text-gray-500",
    COMPLETED: "bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400",
    REJECTED:  "bg-red-100 dark:bg-red-900/40 text-red-500",
    CANCELLED: "bg-gray-100 dark:bg-gray-800 text-gray-500",
  };

  return (
    <Link href={`/feed/${dare.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="category">{dare.category}</Badge>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusClass[dare.status] ?? statusClass.DRAFT}`}>
            {dare.status.charAt(0) + dare.status.slice(1).toLowerCase()}
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 leading-snug line-clamp-2">{dare.title}</h3>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-sm font-bold text-amber-500">${parseFloat(dare.rewardAmount).toFixed(2)}</span>
          <span className="text-xs text-gray-400">{dare._count.acceptances} accepted</span>
        </div>
      </Card>
    </Link>
  );
}

// ── Acceptance card ────────────────────────────────────────────────────────

function AcceptanceCard({ acceptance }: { acceptance: ProfileAcceptance }) {
  const dare = acceptance.dare;
  const statusMap: Record<string, { label: string; cls: string }> = {
    ACCEPTED:  { label: "In Progress", cls: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" },
    SUBMITTED: { label: "Under Review", cls: "bg-amber-100 dark:bg-amber-900/40 text-amber-600" },
    APPROVED:  { label: "Completed",    cls: "bg-green-100 dark:bg-green-900/40 text-green-600" },
    REJECTED:  { label: "Rejected",     cls: "bg-red-100 dark:bg-red-900/40 text-red-500" },
    CANCELLED: { label: "Cancelled",    cls: "bg-gray-100 dark:bg-gray-800 text-gray-500" },
  };
  const st = statusMap[acceptance.status] ?? statusMap.ACCEPTED;

  return (
    <Link href={`/feed/${dare.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="category">{dare.category}</Badge>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${st.cls}`}>{st.label}</span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 leading-snug line-clamp-2">{dare.title}</h3>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-sm font-bold text-amber-500">${parseFloat(dare.rewardAmount).toFixed(2)}</span>
          <span className="text-xs text-gray-400">{relativeTime(acceptance.createdAt)}</span>
        </div>
      </Card>
    </Link>
  );
}

// ── Edit profile modal ─────────────────────────────────────────────────────

function EditProfileModal({ displayName, bio, onClose }: {
  displayName: string; bio: string | null; onClose: () => void;
}) {
  const [name, setName] = useState(displayName);
  const [bioText, setBioText] = useState(bio ?? "");
  const update = useUpdateProfile();

  const handleSave = () => {
    update.mutate({ displayName: name.trim(), bio: bioText.trim() || undefined }, {
      onSuccess: onClose,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Edit Profile</h2>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Display Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/40"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Bio</label>
          <textarea
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
            maxLength={300}
            rows={3}
            placeholder="Tell others a little about yourself..."
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 resize-none"
          />
          <p className="text-xs text-gray-400 text-right">{bioText.length}/300</p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={handleSave} disabled={update.isPending || !name.trim()}>
            {update.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────

type TabKey = "dares" | "active" | "completed";

export default function ProfilePage() {
  const { t } = useLanguage();
  const [editOpen, setEditOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("dares");
  const [daresPage, setDaresPage] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [completedPage, setCompletedPage] = useState(1);

  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: daresData, isLoading: daresLoading } = useMyDares(daresPage);
  const { data: activeData, isLoading: activeLoading } = useMyAcceptances({ page: activePage, status: "ACCEPTED" });
  const { data: completedData, isLoading: completedLoading } = useMyAcceptances({ page: completedPage, status: "APPROVED" });
  const { data: activity, isLoading: activityLoading } = useMyActivity();

  const activityTypeMap: Record<string, { label: string; variant: "success" | "category" | "pending" | "default" }> = {
    success:  { label: t.profile.activityDone,    variant: "success"  },
    pending:  { label: t.profile.activityPending, variant: "pending"  },
    rejected: { label: "Rejected",                variant: "default"  },
    category: { label: t.profile.activityNew,     variant: "category" },
  };

  if (profileLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        <Skeleton className="h-28 rounded-2xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
        </div>
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <p className="text-gray-500">Please sign in to view your profile.</p>
        <Link href="/login"><Button className="mt-4">Sign In</Button></Link>
      </div>
    );
  }

  const tabs: { key: TabKey; label: string; count?: number }[] = [
    { key: "dares",     label: t.profile.createdDares,   count: profile.stats.daresCreated   },
    { key: "active",    label: "Active Dares",            count: activeData?.pagination.total  },
    { key: "completed", label: t.profile.completedDares, count: profile.stats.daresCompleted },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {editOpen && (
        <EditProfileModal
          displayName={profile.displayName}
          bio={profile.bio}
          onClose={() => setEditOpen(false)}
        />
      )}

      {/* Profile header */}
      <Card>
        <div className="flex items-center gap-5">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.displayName}
              className="w-16 h-16 rounded-2xl object-cover shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 flex items-center justify-center text-2xl font-extrabold shrink-0">
              {profile.displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{profile.displayName}</h1>
              {profile.status !== "ACTIVE" && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  profile.status === "BLOCKED"
                    ? "bg-red-100 dark:bg-red-900/40 text-red-500"
                    : "bg-amber-100 dark:bg-amber-900/40 text-amber-600"
                }`}>
                  {profile.status.charAt(0) + profile.status.slice(1).toLowerCase()}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500">@{profile.username}</p>
            {profile.bio && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{profile.bio}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">{t.profile.memberSince} {formatDate(profile.createdAt)}</p>
          </div>
          <Button variant="outline" size="sm" className="shrink-0" onClick={() => setEditOpen(true)}>
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: "🎯", label: t.profile.statsCreated,   value: profile.stats.daresCreated },
          { icon: "✅", label: t.profile.statsCompleted, value: profile.stats.daresCompleted },
          { icon: "💰", label: t.profile.statsEarned,    value: `$${profile.stats.totalEarned.toFixed(2)}` },
          { icon: "⚡", label: t.profile.statsSuccess,   value: `${profile.stats.successRate}%` },
        ].map((s) => (
          <Card key={s.label} className="text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div>
        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 w-fit mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-white dark:bg-gray-700 text-violet-600 dark:text-violet-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
                  activeTab === tab.key
                    ? "bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                }`}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Created dares */}
        {activeTab === "dares" && (
          <div className="space-y-4">
            {daresLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-2xl" />)}
              </div>
            ) : (daresData?.dares ?? []).length === 0 ? (
              <Card>
                <div className="flex flex-col items-center py-10 gap-3">
                  <span className="text-3xl">🎯</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">You haven't created any dares yet.</p>
                  <Link href="/dares/create"><Button size="sm">Create a Dare</Button></Link>
                </div>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(daresData?.dares ?? []).map((d) => <ProfileDareCard key={d.id} dare={d} />)}
                </div>
                {daresData?.pagination && (
                  <Pagination page={daresPage} totalPages={daresData.pagination.totalPages} onChange={setDaresPage} />
                )}
              </>
            )}
          </div>
        )}

        {/* Active acceptances */}
        {activeTab === "active" && (
          <div className="space-y-4">
            {activeLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-2xl" />)}
              </div>
            ) : (activeData?.acceptances ?? []).length === 0 ? (
              <Card>
                <div className="flex flex-col items-center py-10 gap-3">
                  <span className="text-3xl">🏃</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t.profile.noAccepted}</p>
                  <Link href="/feed"><Button size="sm" variant="outline">Browse Dares</Button></Link>
                </div>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(activeData?.acceptances ?? []).map((a) => <AcceptanceCard key={a.id} acceptance={a} />)}
                </div>
                {activeData?.pagination && (
                  <Pagination page={activePage} totalPages={activeData.pagination.totalPages} onChange={setActivePage} />
                )}
              </>
            )}
          </div>
        )}

        {/* Completed dares */}
        {activeTab === "completed" && (
          <div className="space-y-4">
            {completedLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-2xl" />)}
              </div>
            ) : (completedData?.acceptances ?? []).length === 0 ? (
              <Card>
                <div className="flex flex-col items-center py-10 gap-3">
                  <span className="text-3xl">✅</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">No completed dares yet. Start accepting!</p>
                  <Link href="/feed"><Button size="sm" variant="outline">Browse Dares</Button></Link>
                </div>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(completedData?.acceptances ?? []).map((a) => <AcceptanceCard key={a.id} acceptance={a} />)}
                </div>
                {completedData?.pagination && (
                  <Pagination page={completedPage} totalPages={completedData.pagination.totalPages} onChange={setCompletedPage} />
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Recent activity */}
      <div>
        <SectionTitle title={t.profile.recentActivity} className="mb-4" />
        {activityLoading ? (
          <Skeleton className="h-48 rounded-2xl" />
        ) : (activity ?? []).length === 0 ? (
          <Card>
            <p className="text-sm text-gray-400 text-center py-6">No recent activity yet.</p>
          </Card>
        ) : (
          <Card padding={false}>
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {(activity ?? []).map((item) => {
                const meta = activityTypeMap[item.type] ?? activityTypeMap.category;
                return (
                  <li key={item.id}>
                    <Link
                      href={`/feed/${item.dareId}`}
                      className="flex items-center justify-between px-5 py-4 gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Badge variant={meta.variant} className="shrink-0">{meta.label}</Badge>
                        <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{item.label}</p>
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 shrink-0">{relativeTime(item.createdAt)}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
}
