"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";

type ToastType = "success" | "error" | "info";

type ToastPosition = "top" | "bottom";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
  position: ToastPosition;
}

interface ToastContextValue {
  showToast: (
    message: string,
    type?: ToastType,
    options?: { position?: ToastPosition }
  ) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

const icons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

const colors: Record<ToastType, string> = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-gray-800",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = "success", options?: { position?: ToastPosition }) => {
      const position: ToastPosition = options?.position ?? "bottom";
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type, position }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const topToasts = toasts.filter((t) => t.position === "top");
  const bottomToasts = toasts.filter((t) => t.position === "bottom");

  const toastEl = (toast: Toast) => (
    <div
      key={toast.id}
      className={`${colors[toast.type]} text-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 pointer-events-auto max-w-[min(100vw-2rem,28rem)]`}
    >
      <span className="text-base shrink-0">{icons[toast.type]}</span>
      <span className="leading-snug">{toast.message}</span>
    </div>
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-100 pointer-events-none w-[min(100%-2rem,28rem)]">
        {topToasts.map(toastEl)}
      </div>
      <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-100 pointer-events-none">
        {bottomToasts.map(toastEl)}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
