import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  role?: "user" | "admin";
}

interface AuthState {
  user: AuthUser | null;
  session: Session | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  initialize: () => () => void;
}

function toAuthUser(supabaseUser: User): AuthUser {
  const meta = supabaseUser.user_metadata ?? {};
  // Google sends `picture`; Supabase often normalizes to `avatar_url` — support both.
  const avatarUrl =
    (typeof meta.avatar_url === "string" && meta.avatar_url) ||
    (typeof meta.picture === "string" && meta.picture) ||
    null;

  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? "",
    name:
      (typeof meta.full_name === "string" && meta.full_name) ||
      (typeof meta.name === "string" && meta.name) ||
      (supabaseUser.email?.split("@")[0] ?? "User"),
    avatarUrl,
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoggedIn: false,
  isLoading: true,

  signInWithGoogle: async () => {
    const { createClient } = await import("@/lib/supabase");
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  },

  signOut: async () => {
    const { createClient } = await import("@/lib/supabase");
    const supabase = createClient();
    await supabase.auth.signOut();
    set({ user: null, session: null, isLoggedIn: false });
  },

  initialize: () => {
    let mounted = true;

    const run = async () => {
      const { createClient } = await import("@/lib/supabase");
      const supabase = createClient();

      // Load initial session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        if (session?.user) {
          set({
            user: toAuthUser(session.user),
            session,
            isLoggedIn: true,
            isLoading: false,
          });
        } else {
          set({ isLoading: false });
        }
      }

      // Keep in sync with Supabase auth state changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, newSession) => {
        if (!mounted) return;
        if (newSession?.user) {
          set({
            user: toAuthUser(newSession.user),
            session: newSession,
            isLoggedIn: true,
            isLoading: false,
          });
        } else {
          set({ user: null, session: null, isLoggedIn: false, isLoading: false });
        }
      });

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    };

    // run() returns a cleanup fn; store it and expose it to the caller
    let cleanup = () => {};
    run().then((fn) => {
      cleanup = fn;
    });

    return () => cleanup();
  },
}));
