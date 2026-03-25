# Frontend Current State

## Status
Phase 7 complete. Auth UI & Protected Experience implemented. Ready for Phase 8 — Dare Interaction Enhancements.

## What exists right now

### Infrastructure
- `src/providers/QueryProvider.tsx` — TanStack Query
- `src/store/useAuthStore.ts` — Zustand auth
- `src/context/ToastContext.tsx` — Toast system
- `src/context/LanguageContext.tsx` — Language context with `useLanguage()` hook
- `src/i18n/en.ts` — Full English translations (`Translations` type exported), includes `auth` section
- `src/i18n/ka.ts` — Full Georgian translations (implements `Translations`), includes `auth` section
- `src/services/` — dare.service.ts, wallet.service.ts (mock, swap-ready)
- `src/hooks/` — useDares, useDare, useCreateDare, useWallet

### i18n System
- Context-based, no URL changes
- `LanguageProvider` wraps entire app in `layout.tsx`
- `useLanguage()` returns `{ t, locale, setLocale }`
- EN/KA toggle button in Header (desktop + mobile)
- All UI text uses `t.*` keys — zero hardcoded strings remain

### Auth Pages
- `/login` — Email/password form, demo login, link to register, "forgot password" label
- `/register` — Name/email/password form, demo register, link to login
- Both redirect to `/feed` after success (800ms simulated delay)
- Both fully translated via `useLanguage()`

### UI Components (polished)
- `Button` — active:scale-95 press effect, cursor-pointer, transition-all
- `Card` — optional `hover` prop for lift effect on interactive cards
- `DareCard` — hover lift, larger reward amount, divider before actions
- `Skeleton` — shimmer animation (CSS gradient sweep) instead of plain pulse
- `EmptyState` — larger icon, bolder title, more engaging layout
- `ProtectedRoute` — improved layout with icon, two buttons (Sign In → /login, Demo), translated

### Header (upgraded)
- Logged-in state: user avatar (initials) + name in pill button → dropdown with Profile, Wallet, Sign Out
- Dropdown closes on outside click (useEffect + ref)
- Logged-out state: Sign In → `/login`, Get Started → `/register`
- Mobile menu: shows avatar + name, Profile/Wallet links, Sign Out button
- Profile and Wallet links moved out of main nav into user dropdown

### Pages (all fully translated)
- `/` — Landing
- `/feed` — Dare feed with filters
- `/feed/[id]` — Dare details + login prompt on "Accept Dare" if not logged in
- `/create` — ProtectedRoute + create dare form
- `/profile` — Profile stats and activity
- `/wallet` — ProtectedRoute + wallet balance
- `/submit/[id]` — Proof upload

### Login Required Prompts
- On `/feed/[id]`: "Accept Dare" redirects to `/login` if not logged in, plus a small hint text below

## What is not done yet
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
- Auth is demo-only: `login(DEMO_USER)` from Zustand, no real API call
