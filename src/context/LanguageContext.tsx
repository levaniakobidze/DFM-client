"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import en, { Translations } from "@/i18n/en";
import ka from "@/i18n/ka";

export type Locale = "en" | "ka";

const translations: Record<Locale, Translations> = { en, ka };
const LOCALE_STORAGE_KEY = "app.locale";

function isLocale(value: string): value is Locale {
  return value === "en" || value === "ka";
}

interface LanguageContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "ka",
  t: ka,
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return "ka";
    }

    const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return savedLocale && isLocale(savedLocale) ? savedLocale : "ka";
  });

  useEffect(() => {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
