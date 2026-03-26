import { create } from "zustand";

const initialLikes: Record<string, number> = {
  "1": 12, "2": 8, "3": 5, "4": 23, "5": 7, "6": 15, "7": 19, "8": 4,
};

export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface Comment {
  id: string;
  author: string;
  text: string;
  time: string;
}

interface InteractionState {
  likes: Record<string, number>;
  liked: Record<string, boolean>;
  bookmarks: Record<string, boolean>;
  accepted: string[];
  reported: Record<string, boolean>;
  comments: Record<string, Comment[]>;
  submissionStatuses: Record<string, SubmissionStatus>;
  toggleLike: (id: string) => void;
  toggleBookmark: (id: string) => void;
  acceptDare: (id: string) => void;
  reportDare: (id: string) => void;
  addComment: (dareId: string, comment: Comment) => void;
  submitDare: (id: string) => void;
}

export const useInteractionStore = create<InteractionState>((set) => ({
  likes: { ...initialLikes },
  liked: {},
  bookmarks: {},
  accepted: [],
  reported: {},
  comments: {},
  // Pre-seeded mock submission statuses for demo purposes
  submissionStatuses: { "4": "approved", "5": "rejected" },
  toggleLike: (id) =>
    set((s) => {
      const isLiked = !!s.liked[id];
      return {
        liked: { ...s.liked, [id]: !isLiked },
        likes: { ...s.likes, [id]: (s.likes[id] ?? 0) + (isLiked ? -1 : 1) },
      };
    }),
  toggleBookmark: (id) =>
    set((s) => ({
      bookmarks: { ...s.bookmarks, [id]: !s.bookmarks[id] },
    })),
  acceptDare: (id) =>
    set((s) => ({
      accepted: s.accepted.includes(id) ? s.accepted : [...s.accepted, id],
    })),
  reportDare: (id) =>
    set((s) => ({
      reported: { ...s.reported, [id]: true },
    })),
  addComment: (dareId, comment) =>
    set((s) => ({
      comments: {
        ...s.comments,
        [dareId]: [...(s.comments[dareId] ?? []), comment],
      },
    })),
  submitDare: (id) =>
    set((s) => ({
      submissionStatuses: { ...s.submissionStatuses, [id]: "pending" },
    })),
}));
