# Frontend Project Context

## Project Name
Dare Me For Money MVP

## Frontend Goal
Build the frontend UI for a web platform where users can:
- browse safe paid challenges ("dares")
- create a dare
- accept a dare
- upload proof
- review activity
- manage their profile and wallet

At this stage, the priority is:
1. strong UI structure
2. clean reusable components
3. good UX
4. MVP simplicity

Backend integration is not the current focus unless explicitly requested.

---

## Frontend Stack
- Next.js
- Tailwind CSS
- TypeScript preferred if setup supports it
- TanStack Query for server-state when API integration starts
- Zustand for lightweight UI/global state when needed

---

## Frontend Priorities Right Now
We are currently focusing on:
- UI architecture
- layout
- reusable components
- page structure
- responsive design
- visual hierarchy
- MVP-level user experience

We are NOT focusing yet on:
- final backend integration
- real payments
- full auth logic
- advanced performance optimization
- overengineering

---

## Product Style
The product should feel:
- modern
- clean
- slightly playful
- social / viral ready
- mobile friendly
- easy to understand immediately

Avoid making the design:
- too corporate
- too dark/heavy
- too childish
- too cluttered

---

## Main Product Concept
Users can post safe paid challenges.
Other users can accept them, upload proof, and earn rewards after approval.

Examples of safe dare categories:
- Fun
- Social
- Video
- Creative
- Public harmless challenges

The platform must feel fun and engaging, but not chaotic or unsafe.

---

## Frontend Design Principles
- Keep pages visually clean
- Use cards heavily where useful
- Use clear CTA buttons
- Strong spacing and hierarchy
- Make reward amount visually prominent
- Keep navigation simple
- Prefer reusable sections/components over repeated markup
- MVP first

---

## Tailwind Rules
- Use Tailwind CSS for styling
- Prefer utility classes over custom CSS unless truly necessary
- Keep class names readable and grouped logically
- Reuse patterns through components instead of huge repeated class strings
- Avoid unnecessary abstraction too early

---

## Component Rules
- Build reusable UI components where it makes sense
- Do not create dozens of tiny useless components
- Split components when a file becomes too large or too mixed in responsibility
- Prefer clear prop names
- Keep components easy to read
- Avoid premature optimization

---

## App Structure Preferences
Use a clean scalable folder structure.
Prefer grouping by feature when reasonable.

Possible sections/features:
- landing
- dare feed
- dare details
- create dare
- profile
- wallet
- submission flow

---

## Important UX Rules
- User should understand the product in a few seconds
- Important actions must be obvious
- Reward amount should stand out
- Category should be easy to scan
- Feed should feel dynamic and scroll-friendly
- Mobile UX matters a lot
- Upload flow should feel simple and not intimidating

---

## AI Instructions
When working on this frontend:
- read the docs first
- keep the implementation MVP-level
- do not change unrelated files
- prefer simple clean solutions
- keep UI consistent
- explain changed files at the end
- if something is unclear, make the safest reasonable assumption and continue

---

## Current Focus
Current focus is frontend UI and page structure first.

Do not jump into backend-heavy assumptions unless explicitly requested.