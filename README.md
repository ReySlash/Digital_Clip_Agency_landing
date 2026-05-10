# Digital Clip Agency

Portfolio website for a video editing agency built with Next.js 16, React 19, TypeScript, App Router, Tailwind CSS 4, Prisma, and PostgreSQL.

## Overview

This repository currently contains two connected areas:

- A public Spanish-first landing page at `/`
- An internal admin panel at `/admin` for managing portfolio items

The public site keeps most marketing copy in `lib/site-data.ts`, while the portfolio grid is already backed by the database and only renders published items.

## Current Features

### Public Site

- Sticky navigation with smooth scrolling
- Sections for hero, services, portfolio, about, and contact
- Copy-to-clipboard email button
- Instagram and `mailto:` contact CTAs
- Cinematic dark visual direction with cyan accents
- Scroll reveal motion for section content
- Portfolio grid data is cached and prerendered with Next.js 16 Cache Components

### Admin

- Portfolio items table rendered from Prisma data
- Create, edit, and delete flows for portfolio items
- Published and featured flags
- Sort order support
- Modal state handled with a client context provider
- Credentials-based admin authentication with NextAuth/Auth.js
- Dedicated login screen at `/admin/login`
- Logout flow from the admin dashboard
- Refreshed admin UI with premium dark gradients and status badges
- Portfolio management data is cached and invalidated immediately after admin writes

### Testing

- Vitest is configured for unit and component tests
- Testing Library is used for React component coverage
- Current automated coverage focuses on validation, auth logic, admin actions, cache helpers, and key admin UI interactions

## Current Status

- Portfolio content is no longer placeholder-only; it comes from PostgreSQL through Prisma
- The admin area is protected with credentials-based authentication
- Admin access is currently enforced on the main `/admin` page, while `/admin/login` stays public
- Portfolio data for both `/` and `/admin` is cached with tags and refreshed on-demand through admin mutations
- Request-bound auth and login query state are rendered behind Suspense boundaries to satisfy Next.js 16 cache rules
- Seed data includes bootstrap users and sample portfolio items for local development

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Prisma
- PostgreSQL
- App Router

## Project Structure

```txt
app/
  layout.tsx
  page.tsx
  globals.css
  not-found.tsx
  api/
    auth/
      [...nextauth]/
        route.ts
  admin/
    layout.tsx
    login/
      page.tsx
    page.tsx

actions/
  admin/
    portfolio-items-actions.ts
    portfolio-items-validation.ts

components/
  landing/
    hero-section.tsx
    services-section.tsx
    portfolio-section.tsx
    about-section.tsx
    contact-section.tsx
  shared/
    navbar.tsx
    mobile-nav.tsx
    footer.tsx
    section-heading.tsx
    scroll-reveal.tsx
    copy-email-button.tsx
  admin/
    create-item-button.tsx
    logout-button.tsx
    update-item-button.tsx
    remove-item-button.tsx
    portfolio-table.tsx
    portfolio-modal.tsx
    portfolio-modal-wrapper.tsx

contexts/
  portfolio-modal-context.tsx

lib/
  navigation.ts
  portfolio-data.ts
  prisma.ts
  site-data.ts
  zod-utils.ts

prisma/
  schema.prisma
  seed.ts
  migrations/

schemas/
  create-portfolio-item-schema.ts
  update-portfolio-item-schema.ts

types/
  next-auth.d.ts

auth.ts
```

## Test Setup

- `vitest.config.ts` configures jsdom, coverage, and the `@/*` alias
- `test/setup.ts` loads `@testing-library/jest-dom` and resets mocks between tests
- Auth decision logic is extracted into `lib/auth-logic.ts` to keep NextAuth wiring thin and testable

Current test coverage includes:

- portfolio schemas
- FormData validation helpers
- zod error formatting
- credentials auth logic and callbacks
- portfolio mutation actions and cache invalidation
- cached portfolio data helpers
- logout button interaction
- portfolio table rendering states

## Data Flow

- `lib/site-data.ts` stores hardcoded marketing content for most landing sections
- `lib/navigation.ts` stores same-page navigation links
- `lib/portfolio-data.ts` contains cached Prisma reads for public and admin portfolio data
- `components/landing/portfolio-section.tsx` reads published portfolio items through the cached data layer
- `app/admin/page.tsx` reads admin portfolio data through the cached data layer
- `actions/admin/portfolio-items-actions.ts` handles create, update, and delete server actions, then expires cache tags with `updateTag`
- `auth.ts` configures NextAuth/Auth.js credentials authentication against Prisma users
- `app/admin/login/page.tsx` submits login credentials through `signIn()` and redirects back to `/admin`
- `/admin` and `/admin/login` wrap request-time auth/searchParams access in `<Suspense>` so the route shell can still prerender

## Caching Strategy

- `next.config.ts` enables `cacheComponents: true`
- `lib/portfolio-data.ts` uses `"use cache"` with `cacheLife("max")`
- Public portfolio data is tagged with `portfolio` and `portfolio-public`
- Admin portfolio data is tagged with `portfolio` and `portfolio-admin`
- Admin mutations call `updateTag("portfolio")`, `updateTag("portfolio-public")`, and `updateTag("portfolio-admin")`
- Result: landing and admin data stay cached until an admin changes the portfolio, then the next request gets fresh data immediately

## Environment Variables

The app currently requires a PostgreSQL connection string plus auth configuration:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/digital_clip_agency?schema=public"
AUTH_SECRET="generated-secret"
AUTH_TRUST_HOST=true
```

Copy `.env.example` to `.env` and update it for your local database.

## Local Development

Install dependencies:

```bash
npm install
```

Generate the Prisma client:

```bash
npx prisma generate
```

Apply migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx tsx prisma/seed.ts
```

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the admin panel.

If you are not authenticated, `/admin` redirects to `/admin/login`.

## Verification

Lint:

```bash
npm run lint
```

Type check:

```bash
npm run typecheck
```

Tests:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

Production build:

```bash
npm run build
```

## Seeded Local Accounts

The seed script creates these users:

- `admin@digitalclipagency.com` / `ChangeMe_Admin_123!`
- `dev@digitalclipagency.com` / `ChangeMe_Dev_123!`

These are local bootstrap credentials defined in `prisma/seed.ts`. Treat them as development-only and replace them before using the project beyond local setup.

## Notes

- Same-page section navigation uses plain anchor links, not `next/link`
- `ScrollReveal` is the main client-side motion utility
- `PortfolioModalProvider` is mounted only in the admin layout
- `lib/prisma.ts` throws if `DATABASE_URL` is missing
- Because the homepage imports the Prisma-backed portfolio section, the app also needs database access when rendering `/`
- Next.js 16 deprecates `middleware.ts` in favor of `proxy.ts`, but this project currently avoids proxy-based auth and protects the admin route inside app runtime code instead
- With `cacheComponents: true`, request-time APIs like auth cookies and `searchParams` must live behind `<Suspense>` unless fully cached

## Roadmap Direction

- Harden and refine `/admin` owner-only auth
- Expand admin capabilities beyond portfolio management
- Keep reducing unnecessary database reads on the free Neon tier
- Keep the public site professional, minimal, and Spanish-first
- Add English support later if needed
