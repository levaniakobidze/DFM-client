"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function AccountStatusBanner() {
  const { data: user } = useCurrentUser();

  if (!user || !user.status || user.status === "ACTIVE") return null;

  const isBlocked = user.status === "BLOCKED";

  return (
    <div className={`w-full px-4 py-2.5 text-center text-sm font-medium ${
      isBlocked
        ? "bg-red-600 text-white"
        : "bg-amber-500 text-white"
    }`}>
      {isBlocked ? (
        <>
          🚫 Your account has been <strong>blocked</strong>. You cannot perform any actions.
          Contact support to appeal.
        </>
      ) : (
        <>
          ⏸ Your account is <strong>paused</strong>. Some actions are temporarily restricted.
          Contact support for more information.
        </>
      )}
    </div>
  );
}
