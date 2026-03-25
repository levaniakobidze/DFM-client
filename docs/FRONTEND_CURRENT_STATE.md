# Frontend Current State

## Status
Phase 3 complete. Moving into Phase 4 — Integration Preparation.

## What exists right now

### Layout & Components
- App layout with sticky Header (desktop + mobile nav)
- `src/components/layout/Header.tsx` — Browse, Create, Profile, Wallet links + mobile menu
- `src/components/ui/Button.tsx` — 5 variants, 3 sizes
- `src/components/ui/Card.tsx`
- `src/components/ui/Badge.tsx` — 6 variants
- `src/components/ui/SectionTitle.tsx`
- `src/components/ui/EmptyState.tsx`
- `src/components/ui/Skeleton.tsx` — Skeleton + CardSkeleton
- `src/components/dare/DareCard.tsx`
- `src/context/ToastContext.tsx` — ToastProvider + useToast hook (success / error / info)
- `src/lib/utils.ts`
- `src/lib/mock-data.ts` — 8 mock dares across 5 categories

### Pages
- `/` — Landing page
- `/feed` — Feed with category chips, sort dropdown (newest/highest/lowest reward), skeleton loading, empty state
- `/feed/[id]` — Dare details with accept action
- `/create` — Create dare form → triggers success toast on submit
- `/profile` — Profile with stats, created/completed dares, activity feed
- `/wallet` — Balance, pending rewards, transaction history
- `/submit/[id]` — Upload proof form → triggers info toast on submit

### UX Features (Phase 3)
- Toast notifications (bottom-right, auto-dismiss after 3.5s)
- Category filter chips on feed
- Sort by: Newest / Highest Reward / Lowest Reward
- Skeleton card loaders on feed initial load (800ms simulation)
- Empty state on feed when category has no dares
- Profile/Wallet accessible from main nav (desktop + mobile)

## What is not finalized yet
- real API integration
- auth implementation
- payment flow
- moderation dashboard
- final DB-driven states

## Next Recommended Step
Phase 4 — Integration Preparation:
1. TanStack Query setup
2. Zustand setup
3. API layer structure (services/hooks)
4. Replace mock data with API-ready hooks
5. Protected route handling strategy

## Notes for AI
- use existing components — do not rebuild them
- toast is available via `useToast()` from `@/context/ToastContext`
- mock data lives in `src/lib/mock-data.ts`
- keep solutions MVP-level
