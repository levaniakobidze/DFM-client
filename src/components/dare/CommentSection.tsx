"use client";

import { useState } from "react";
import Link from "next/link";
import { useInteractionStore, Comment } from "@/store/useInteractionStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useLanguage } from "@/context/LanguageContext";
import Card from "@/components/ui/Card";

const seedComments: Record<string, Comment[]> = {
  "1": [
    { id: "s1", author: "Maya R.", text: "This one looks tough but fun! 🔥", time: "3 hours ago" },
    { id: "s2", author: "Leo K.", text: "Completed this yesterday, highly recommend!", time: "1 day ago" },
  ],
  "4": [
    { id: "s3", author: "Dana W.", text: "Singing in public takes guts. Love this dare.", time: "5 hours ago" },
  ],
  "7": [
    { id: "s4", author: "Sam T.", text: "I actually made a friend doing this one 😄", time: "2 days ago" },
  ],
};

interface Props {
  dareId: string;
}

export default function CommentSection({ dareId }: Props) {
  const { t } = useLanguage();
  const { isLoggedIn, user } = useAuthStore();
  const { comments, addComment } = useInteractionStore();
  const [text, setText] = useState("");

  const allComments = [
    ...(seedComments[dareId] ?? []),
    ...(comments[dareId] ?? []),
  ];

  const handlePost = () => {
    if (!text.trim() || !user) return;
    addComment(dareId, {
      id: Date.now().toString(),
      author: user.name,
      text: text.trim(),
      time: "Just now",
    });
    setText("");
  };

  return (
    <Card className="mb-4">
      <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span>💬</span>
        <span>{t.interactions.comments}</span>
        {allComments.length > 0 && (
          <span className="text-xs text-gray-400 dark:text-gray-500 font-normal">({allComments.length})</span>
        )}
      </h2>

      {allComments.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500 italic mb-4">{t.interactions.noComments}</p>
      ) : (
        <ul className="space-y-4 mb-4">
          {allComments.map((c) => (
            <li key={c.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {c.author[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{c.author}</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{c.time}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {isLoggedIn ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePost()}
            placeholder={t.interactions.commentPlaceholder}
            className="flex-1 text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-300"
          />
          <button
            onClick={handlePost}
            disabled={!text.trim()}
            className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.interactions.postComment}
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-400 dark:text-gray-500">
          <Link href="/login" className="text-violet-600 hover:underline font-medium">
            {t.nav.signIn}
          </Link>
          {" "}{t.interactions.loginToInteract}
        </p>
      )}
    </Card>
  );
}
