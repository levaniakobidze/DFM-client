# Frontend Current State

## Status
Phase 1 complete. Moving into Phase 2 — Core Pages.

## What exists right now
- Next.js app initialized with TypeScript and Tailwind CSS
- App layout set up with Header, global styles, and metadata
- `src/components/layout/Header.tsx` — sticky nav with desktop links and mobile hamburger menu
- `src/components/ui/Button.tsx` — primary / secondary / outline / ghost / danger variants, 3 sizes
- `src/components/ui/Card.tsx` — reusable card shell with optional padding
- `src/components/ui/Badge.tsx` — category / reward / success / pending / danger variants
- `src/components/ui/SectionTitle.tsx` — heading + optional subtitle
- `src/components/ui/EmptyState.tsx` — icon + title + description + optional CTA
- `src/components/ui/Skeleton.tsx` — Skeleton line + CardSkeleton loader
- `src/lib/utils.ts` — cn() class name helper
- `docs/` folder with full project context, UI guidelines, page flows, and task list

## Current frontend focus
- Build core pages using the established component system
- Landing page
- Dare feed page
- Dare details page
- Create dare page
- Profile and wallet pages
- Submission upload page

## What is not finalized yet
- real API integration
- auth implementation details
- payment flow
- moderation dashboard behavior
- final DB-driven states

## Assumptions for now
- mock data is acceptable for UI-first work
- components should be built in a way that can later connect to real APIs
- design should be mobile-friendly from the start

## Next Recommended Step
Start Phase 2 — Core Pages:
1. landing page
2. dare feed page
3. dare details page
4. create dare page
5. profile page
6. wallet page
7. submission upload page

## Notes for AI
If asked to implement UI:
- prefer mock data first
- keep components reusable
- use existing components (Button, Card, Badge, etc.) — do not rebuild them
- do not block progress waiting for backend
- prioritize clean visuals and UX
