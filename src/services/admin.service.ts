// Replace mock implementations with real API calls when backend is ready.

export type SubmissionStatus = "pending" | "approved" | "rejected";
export type ReportStatus = "open" | "resolved" | "dismissed";
export type DareStatus = "open" | "pending" | "completed" | "expired";

export interface AdminStats {
  totalDares: number;
  totalUsers: number;
  pendingSubmissions: number;
  openReports: number;
  totalRewardsPaid: number;
  activeThisWeek: number;
}

export interface AdminSubmission {
  id: string;
  dareId: string;
  dareTitle: string;
  submittedBy: string;
  date: string;
  status: SubmissionStatus;
  notes: string;
  reward: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  daresCreated: number;
  daresCompleted: number;
  totalEarned: number;
  role: "user" | "admin";
}

export interface AdminDare {
  id: string;
  title: string;
  category: string;
  reward: number;
  status: DareStatus;
  createdBy: string;
  createdDate: string;
  submissions: number;
}

export interface AdminReport {
  id: string;
  dareId: string;
  dareTitle: string;
  reportedBy: string;
  reason: string;
  date: string;
  status: ReportStatus;
}

// ── Mock data ──────────────────────────────────────────────

const mockStats: AdminStats = {
  totalDares: 8,
  totalUsers: 124,
  pendingSubmissions: 3,
  openReports: 2,
  totalRewardsPaid: 280,
  activeThisWeek: 47,
};

const mockSubmissions: AdminSubmission[] = [
  { id: "s1", dareId: "1", dareTitle: "Eat a spoonful of hot sauce",      submittedBy: "Alex M.",   date: "Mar 26, 2026", status: "pending",  notes: "Completed in one take, no cheating!", reward: 15 },
  { id: "s2", dareId: "2", dareTitle: "Compliment 5 strangers",           submittedBy: "Jordan K.", date: "Mar 25, 2026", status: "pending",  notes: "All 5 interactions recorded.",         reward: 30 },
  { id: "s3", dareId: "3", dareTitle: "Draw a portrait in 60 seconds",    submittedBy: "Sam W.",    date: "Mar 24, 2026", status: "pending",  notes: "Timer visible throughout.",            reward: 10 },
  { id: "s4", dareId: "4", dareTitle: "Sing a song in a coffee shop",     submittedBy: "Dana R.",   date: "Mar 22, 2026", status: "approved", notes: "Great performance, crowd loved it.",   reward: 50 },
  { id: "s5", dareId: "5", dareTitle: "Do a 60-second product review",    submittedBy: "Chris P.",  date: "Mar 20, 2026", status: "rejected", notes: "Video was under 40 seconds.",          reward: 20 },
  { id: "s6", dareId: "6", dareTitle: "Learn and perform a magic trick",  submittedBy: "Taylor M.", date: "Mar 18, 2026", status: "approved", notes: "Very convincing trick!",              reward: 25 },
  { id: "s7", dareId: "7", dareTitle: "Start a conversation with a stranger", submittedBy: "Maria L.", date: "Mar 15, 2026", status: "approved", notes: "Had genuine 3-minute chat.", reward: 35 },
];

const mockUsers: AdminUser[] = [
  { id: "u1", name: "Alex M.",   email: "alex@example.com",   joinedDate: "Mar 1, 2026",  daresCreated: 3, daresCompleted: 4, totalEarned: 45,  role: "user"  },
  { id: "u2", name: "Jordan K.", email: "jordan@example.com", joinedDate: "Mar 5, 2026",  daresCreated: 2, daresCompleted: 2, totalEarned: 30,  role: "user"  },
  { id: "u3", name: "Sam W.",    email: "sam@example.com",    joinedDate: "Mar 10, 2026", daresCreated: 1, daresCompleted: 1, totalEarned: 15,  role: "user"  },
  { id: "u4", name: "Dana R.",   email: "dana@example.com",   joinedDate: "Mar 12, 2026", daresCreated: 4, daresCompleted: 6, totalEarned: 80,  role: "user"  },
  { id: "u5", name: "Chris P.",  email: "chris@example.com",  joinedDate: "Mar 15, 2026", daresCreated: 2, daresCompleted: 1, totalEarned: 20,  role: "user"  },
  { id: "u6", name: "Maria L.",  email: "maria@example.com",  joinedDate: "Mar 18, 2026", daresCreated: 1, daresCompleted: 1, totalEarned: 35,  role: "user"  },
  { id: "u7", name: "Taylor M.", email: "taylor@example.com", joinedDate: "Mar 20, 2026", daresCreated: 3, daresCompleted: 3, totalEarned: 60,  role: "user"  },
  { id: "u8", name: "Jake R.",   email: "jake@example.com",   joinedDate: "Mar 22, 2026", daresCreated: 2, daresCompleted: 2, totalEarned: 30,  role: "user"  },
  { id: "u9", name: "Admin",     email: "admin@dareme.com",   joinedDate: "Jan 1, 2026",  daresCreated: 0, daresCompleted: 0, totalEarned: 0,   role: "admin" },
];

const mockDares: AdminDare[] = [
  { id: "1", title: "Eat a spoonful of hot sauce",        category: "Fun",      reward: 15, status: "open",      createdBy: "Jake R.",   createdDate: "Mar 20, 2026", submissions: 1 },
  { id: "2", title: "Compliment 5 strangers",             category: "Social",   reward: 30, status: "open",      createdBy: "Maria L.",  createdDate: "Mar 18, 2026", submissions: 2 },
  { id: "3", title: "Draw a portrait in 60 seconds",      category: "Creative", reward: 10, status: "open",      createdBy: "Sam T.",    createdDate: "Mar 15, 2026", submissions: 1 },
  { id: "4", title: "Sing a song in a coffee shop",       category: "Public",   reward: 50, status: "completed", createdBy: "Chris P.",  createdDate: "Mar 12, 2026", submissions: 3 },
  { id: "5", title: "Do a 60-second product review",      category: "Video",    reward: 20, status: "open",      createdBy: "Taylor M.", createdDate: "Mar 10, 2026", submissions: 1 },
  { id: "6", title: "Learn and perform a magic trick",    category: "Fun",      reward: 25, status: "completed", createdBy: "Jordan K.", createdDate: "Mar 8, 2026",  submissions: 2 },
  { id: "7", title: "Start a conversation with a stranger", category: "Social", reward: 35, status: "open",      createdBy: "Alex M.",   createdDate: "Mar 5, 2026",  submissions: 2 },
  { id: "8", title: "Paint something abstract in 10 mins", category: "Creative", reward: 15, status: "expired",  createdBy: "Dana W.",   createdDate: "Feb 28, 2026", submissions: 0 },
];

const mockReports: AdminReport[] = [
  { id: "r1", dareId: "1", dareTitle: "Eat a spoonful of hot sauce",  reportedBy: "Sam W.",    reason: "Could encourage dangerous behaviour for younger users.", date: "Mar 25, 2026", status: "open" },
  { id: "r2", dareId: "4", dareTitle: "Sing a song in a coffee shop", reportedBy: "Taylor M.", reason: "Privacy concerns — bystanders visible in submission video.", date: "Mar 23, 2026", status: "open" },
  { id: "r3", dareId: "2", dareTitle: "Compliment 5 strangers",       reportedBy: "Chris P.",  reason: "Submission contains inappropriate language.",               date: "Mar 18, 2026", status: "resolved" },
];

// ── Fetchers ───────────────────────────────────────────────

export async function fetchAdminStats(): Promise<AdminStats> {
  await new Promise((r) => setTimeout(r, 400));
  return mockStats;
}

export async function fetchAdminSubmissions(): Promise<AdminSubmission[]> {
  await new Promise((r) => setTimeout(r, 500));
  return mockSubmissions;
}

export async function fetchAdminUsers(): Promise<AdminUser[]> {
  await new Promise((r) => setTimeout(r, 500));
  return mockUsers;
}

export async function fetchAdminDares(): Promise<AdminDare[]> {
  await new Promise((r) => setTimeout(r, 400));
  return mockDares;
}

export async function fetchAdminReports(): Promise<AdminReport[]> {
  await new Promise((r) => setTimeout(r, 400));
  return mockReports;
}
