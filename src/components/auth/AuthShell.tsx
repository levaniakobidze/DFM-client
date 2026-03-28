"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
};

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export default function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-linear-to-b from-violet-50/90 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-600/20" />
        <div className="absolute -right-16 top-1/4 h-64 w-64 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-600/15" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-blue-400/15 blur-3xl dark:bg-blue-600/10" />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-md"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item} className="text-center">
            <Link
              href="/"
              className="inline-block text-2xl font-extrabold tracking-tight bg-linear-to-r from-violet-600 via-fuchsia-500 to-blue-500 bg-clip-text text-transparent"
            >
              DareMe
            </Link>
          </motion.div>

          <motion.h1 variants={item} className="mt-5 text-center text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </motion.h1>

          <motion.p variants={item} className="mt-2 text-center text-base text-gray-600 dark:text-gray-400">
            {subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-8">
            <div className="rounded-3xl border border-white/50 bg-white/70 p-8 shadow-2xl shadow-violet-500/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-black/40">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.28, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {children}
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={item} className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            {footer}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
