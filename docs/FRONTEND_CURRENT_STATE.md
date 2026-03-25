# Frontend Current State

## Status
Phase 6 complete. Full Georgian localization implemented via context-based i18n. Ready for Phase 7 — Auth UI & Protected Experience.

## What exists right now

### Infrastructure
- `src/providers/QueryProvider.tsx` — TanStack Query
- `src/store/useAuthStore.ts` — Zustand auth
- `src/context/ToastContext.tsx` — Toast system
- `src/context/LanguageContext.tsx` — Language context with `useLanguage()` hook
- `src/i18n/en.ts` — Full English translations (`Translations` type exported)
- `src/i18n/ka.ts` — Full Georgian translations (implements `Translations`)
- `src/services/` — dare.service.ts, wallet.service.ts (mock, swap-ready)
- `src/hooks/` — useDares, useDare, useCreateDare, useWallet

### i18n System
- Context-based, no URL changes (no `/en/` or `/ka/` prefixes)
- `LanguageProvider` wraps entire app in `layout.tsx`
- `useLanguage()` returns `{ t, locale, setLocale }`
- EN/KA toggle button in Header (desktop + mobile)
- All UI text uses `t.*` keys — zero hardcoded strings remain

### UI Components (polished)
- `Button` — active:scale-95 press effect, cursor-pointer, transition-all
- `Card` — optional `hover` prop for lift effect on interactive cards
- `DareCard` — hover lift, larger reward amount, divider before actions
- `Skeleton` — shimmer animation (CSS gradient sweep) instead of plain pulse
- `EmptyState` — larger icon, bolder title, more engaging layout
- `ProtectedRoute` — translated title/desc/button via `useLanguage()`
- All components: consistent spacing, leading, and typography

### Pages (all fully translated)
- `/` — Landing: all text from `t.landing.*`
- `/feed` — Title, subtitle, category labels, sort options, empty/error states
- `/feed/[id]` — Back link, labels, action card, not-found message
- `/create` — Form labels, placeholders, success screen, toast messages
- `/profile` — Stats labels, section titles, badge labels, activity types
- `/wallet` — Balance card, pending card, transaction history header
- `/submit/[id]` — Back link, section title, upload labels, success screen

### UX Micro-interactions
- All buttons: press scale effect
- DareCard: hover lift + shadow
- Category chips on feed: shrink-0 for mobile scroll, active scale
- Category links on landing: hover bg-violet-50 + border highlight

## What is not done yet
- Auth UI pages (Phase 7)
- Dare interactions: likes, bookmarks, share (Phase 8)
- Notifications UI (Phase 9)
- Wallet UX improvements (Phase 10)
- SEO / meta tags (Phase 12)

## Notes for AI
- Use `hover` prop on Card for interactive card surfaces
- Shimmer is CSS-based via `.shimmer-effect` class in globals.css
- Do not rebuild existing components — extend them
- i18n is context-based — add new keys to both `en.ts` and `ka.ts` when adding text
- `Translations` type is exported from `en.ts` — `ka.ts` must implement it fully
