import { create } from "zustand";

export type NotificationType =
  | "dare_accepted"
  | "submission_approved"
  | "submission_rejected"
  | "reward_received";

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  time: string;
  read: boolean;
  dareId?: string;
}

interface NotificationState {
  notifications: Notification[];
  markRead: (id: string) => void;
  markAllRead: () => void;
}

const seed: Notification[] = [
  {
    id: "1",
    type: "reward_received",
    message: "You earned $30.00 for completing \"Compliment 5 strangers\"",
    time: "2 minutes ago",
    read: false,
    dareId: "2",
  },
  {
    id: "2",
    type: "submission_approved",
    message: "Your proof for \"Eat a spoonful of hot sauce\" was approved!",
    time: "1 hour ago",
    read: false,
    dareId: "1",
  },
  {
    id: "3",
    type: "dare_accepted",
    message: "Someone accepted your dare \"Draw a portrait in 60 seconds\"",
    time: "3 hours ago",
    read: false,
    dareId: "3",
  },
  {
    id: "4",
    type: "submission_rejected",
    message: "Your proof for \"Sing a song in a coffee shop\" needs revision.",
    time: "Yesterday",
    read: true,
    dareId: "4",
  },
  {
    id: "5",
    type: "dare_accepted",
    message: "2 people accepted your dare \"Learn and perform a magic trick\"",
    time: "2 days ago",
    read: true,
    dareId: "6",
  },
  {
    id: "6",
    type: "reward_received",
    message: "You earned $20.00 for \"Do a 60-second product review\"",
    time: "3 days ago",
    read: true,
    dareId: "5",
  },
];

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: seed,
  markRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  markAllRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
    })),
}));
