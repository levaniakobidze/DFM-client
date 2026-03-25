# Frontend Current State

## Status
All 4 phases complete. Frontend MVP is ready for backend integration.

## What exists right now

### Infrastructure
- `src/providers/QueryProvider.tsx` — TanStack Query client (staleTime 1min, retry 1)
- `src/store/useAuthStore.ts` — Zustand auth store (user, isLoggedIn, login, logout)
- `src/context/ToastContext.tsx` — Toast system (success / error / info)

### Service Layer (swap-ready for real API)
- `src/services/dare.service.ts` — fetchDares, fetchDareById, createDare, submitProof
- `src/services/wallet.service.ts` — fetchWallet

### Hooks
- `src/hooks/useDares.ts` — useQuery for dares list with category filtering
- `src/hooks/useDare.ts` — useQuery for single dare by id
- `src/hooks/useCreateDare.ts` — useMutation + cache invalidation on success
- `src/hooks/useWallet.ts` — useQuery for wallet data

### Layout & Components
- `src/components/layout/Header.tsx` — nav + auth state (Sign In / Sign Out via Zustand)
- `src/components/layout/ProtectedRoute.tsx` — auth guard (demo Sign In button)
- Full UI component library: Button, Card, Badge, SectionTitle, EmptyState, Skeleton, DareCard

### Pages
- `/` — Landing page (server component, mock data)
- `/feed` — useDares hook, sort, category filter, skeleton, error state
- `/feed/[id]` — useDare hook, skeleton while loading
- `/create` — ProtectedRoute + useCreateDare mutation, loading state on button
- `/profile` — static mock data (to be connected when user API is ready)
- `/wallet` — ProtectedRoute + useWallet hook, skeleton loading
- `/submit/[id]` — submitProof service, toast on success

## To connect backend (when ready)
1. Replace service functions in `src/services/` with real fetch/axios calls
2. Update `useAuthStore` login/logout to call auth API
3. Point `ProtectedRoute` redirect to real `/login` page
4. No hook or page logic needs to change

## Notes for AI
- Do not rebuild existing infrastructure — hooks, services, and stores are in place
- Use `useAuthStore` for auth state
- Use `useToast` for feedback
- Wrap protected pages with `<ProtectedRoute>`
- Services are the only files that need changing for backend integration
