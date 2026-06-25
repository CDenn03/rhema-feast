# Event Management Platform — Frontend Boilerplate

Next.js 15 · shadcn/ui · Zustand · Spring Boot backend (HttpOnly cookie auth)

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, Server Components) |
| UI | shadcn/ui + Tailwind CSS |
| Forms | React Hook Form + Zod |
| Tables | TanStack Table v8 |
| Server state | Server Components + TanStack Query (client where needed) |
| Client state | Zustand (checkin scan queue, POS cart) |
| Date utils | date-fns |
| Auth | Spring Boot HttpOnly cookie → `/auth/me` |

## Getting started

```bash
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_URL
npm install
npm run dev
```

## Auth flow

1. `(dashboard)/layout.tsx` calls `getSession()` (server-side fetch to Spring Boot `/auth/me`)
2. No cookie → `redirect("/login")`
3. `admin/layout.tsx` additionally checks `role === "SUPER_USER"`
4. Client-side `useSession()` hook hits `/api/internal/auth` (Next.js route → Spring Boot)

## Key conventions

- **Server Actions** live in `features/[domain]/actions.ts` — mutations only
- **Data fetching** in `features/[domain]/queries.ts` — called from Server Components
- **Domain services** in `features/[domain]/services/` — raw API calls via `apiClient`
- **All API URLs** centralized in `lib/api/endpoints.ts`
- **shadcn components** in `components/ui/` — run `npx shadcn@latest add <component>` to add more

## Adding a shadcn component

```bash
npx shadcn@latest add dialog
npx shadcn@latest add select
npx shadcn@latest add table
```

## Project structure

See `STRUCTURE.md` or the attached spec for the full folder layout.
