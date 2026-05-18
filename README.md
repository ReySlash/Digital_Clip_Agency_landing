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
- In-memory login abuse protection for failed admin sign-ins
- Logout flow from the admin dashboard
- Refreshed admin UI with premium dark gradients and status badges
- Portfolio management data is cached and invalidated immediately after admin writes
- Inline success and error feedback for admin mutations

### Testing

- Vitest is configured for unit and component tests
- Testing Library is used for React component coverage
- Current automated coverage focuses on validation, auth logic, admin auth guards, login abuse protection, cache helpers, admin actions, and key admin UI interactions

## Current Status

- Portfolio content is no longer placeholder-only; it comes from PostgreSQL through Prisma
- The admin area is protected with `ADMIN`-only credentials-based authentication
- Admin access is currently enforced on the main `/admin` page, while `/admin/login` stays public
- Failed admin login attempts are rate limited per IP and email combination
- Portfolio data for both `/` and `/admin` is cached with tags and refreshed on-demand through admin mutations
- Request-bound auth and login query state are rendered behind Suspense boundaries to satisfy Next.js 16 cache rules
- Seed data includes sample portfolio items plus one admin user sourced from local env variables

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
    login-action.ts
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
  admin-auth.ts
  auth-logic.ts
  login-abuse-protection.ts
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
- admin auth guard helpers
- login abuse protection logic
- portfolio mutation actions and cache invalidation
- cached portfolio data helpers
- admin login shell and feedback UI
- logout button interaction
- portfolio table rendering states

## Data Flow

- `lib/site-data.ts` stores hardcoded marketing content for most landing sections
- `lib/navigation.ts` stores same-page navigation links
- `lib/portfolio-data.ts` contains cached Prisma reads for public and admin portfolio data
- `components/landing/portfolio-section.tsx` reads published portfolio items through the cached data layer
- `app/admin/page.tsx` reads admin portfolio data through the cached data layer
- `actions/admin/portfolio-items-actions.ts` handles create, update, and delete server actions, then expires cache tags with `updateTag`
- `actions/admin/login-action.ts` centralizes admin login submission, redirect handling, and failed-attempt rate limiting
- `auth.ts` configures NextAuth/Auth.js credentials authentication against Prisma users
- `app/admin/login/page.tsx` submits login credentials through a server action wrapper so Auth.js redirects can propagate correctly
- `lib/login-abuse-protection.ts` tracks failed login attempts in memory using an IP-plus-email key
- `/admin` and `/admin/login` wrap request-time auth/searchParams access in `<Suspense>` so the route shell can still prerender

## Caching Strategy

- `next.config.ts` enables `cacheComponents: true`
- `lib/portfolio-data.ts` uses `"use cache"` with `cacheLife("max")`
- Public portfolio data is tagged with `portfolio` and `portfolio-public`
- Admin portfolio data is tagged with `portfolio` and `portfolio-admin`
- Admin mutations call `updateTag("portfolio")`, `updateTag("portfolio-public")`, and `updateTag("portfolio-admin")`
- Result: landing and admin data stay cached until an admin changes the portfolio, then the next request gets fresh data immediately

## Environment Variables

The app runtime requires a PostgreSQL connection string plus auth configuration. The local seed script also needs explicit admin credentials:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/digital_clip_agency?schema=public"
AUTH_SECRET="replace-with-output-from-npx-auth-secret"
AUTH_URL="http://localhost:3000"
SEED_ADMIN_EMAIL="owner@example.com"
SEED_ADMIN_PASSWORD="replace-with-a-strong-password"
SEED_ADMIN_NAME="Digital Clip Admin"
```

Copy `.env.example` to `.env` and update it for your local database.

`AUTH_URL` must match the exact app origin in each environment so login redirects resolve correctly.

## Local Development

Install dependencies:

```bash
pnpm install
```

Generate the Prisma client:

```bash
pnpm exec prisma generate
```

Apply migrations:

```bash
pnpm exec prisma migrate dev
```

Seed the database:

```bash
pnpm exec tsx prisma/seed.ts
```

The seed script will stop unless `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` are set. This avoids shipping reusable default admin credentials in the repository.

Run the dev server:

```bash
pnpm dev
```

Open `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the admin panel.

If you are not authenticated, `/admin` redirects to `/admin/login`.

Failed logins are rate limited in memory after repeated attempts from the same IP and email pair. This is lightweight single-instance protection, not a distributed production-grade throttle.

## Deployment

This project is deployment-ready for any platform that can run a Next.js Node server and provide a PostgreSQL database.

### Production Environment Variables

Set these in your deployment platform:

```bash
DATABASE_URL="postgresql://user:password@host:5432/digital_clip_agency?schema=public"
AUTH_SECRET="replace-with-output-from-npx-auth-secret"
AUTH_URL="https://your-domain.com"
```

Do not set local-only seed variables in production unless you explicitly need them for a one-off local workflow.

### Production Database Setup

Apply committed Prisma migrations in production:

```bash
pnpm exec prisma migrate deploy
```

Do not run `pnpm exec tsx prisma/seed.ts` in production. The seed script is intentionally blocked when `NODE_ENV === "production"`.

### Build And Start

Build the application:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

On managed platforms, use their standard Next.js build and start flow while still ensuring migrations run before the app serves traffic.

If you deploy on Vercel, `pnpm-lock.yaml` will make Vercel auto-detect `pnpm` for installs. If you want Vercel to honor the exact `packageManager` version from `package.json`, set `ENABLE_EXPERIMENTAL_COREPACK=1` in the project environment settings.

### Pre-Deploy Checklist

- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- Confirm `DATABASE_URL`, `AUTH_SECRET`, and `AUTH_URL` are set in the target environment
- Confirm all Prisma migrations are committed
- Confirm production deployment will run `pnpm exec prisma migrate deploy`
- Confirm no deployment step runs `prisma/seed.ts`

### Post-Deploy Checklist

- Homepage loads successfully
- Portfolio items render on `/`
- `/admin/login` loads successfully
- Valid admin credentials redirect into `/admin`
- Portfolio create, edit, and delete flows work
- Logout returns the user to the login flow

## Verification

Lint:

```bash
pnpm lint
```

Type check:

```bash
pnpm typecheck
```

Tests:

```bash
pnpm test
```

Watch mode:

```bash
pnpm test:watch
```

Production build:

```bash
pnpm build
```

## Seeded Admin Account

The seed script creates one admin user using `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, and optional `SEED_ADMIN_NAME` from your local environment. No default login credentials are committed to the repo. Seeding is blocked in production via `NODE_ENV` so it cannot be triggered accidentally on a deployed environment.

`AUTH_URL` should match the app origin so login redirects resolve correctly in local and deployed environments.

## Notes

- Same-page section navigation uses plain anchor links, not `next/link`
- `ScrollReveal` is the main client-side motion utility
- `PortfolioModalProvider` is mounted only in the admin layout
- `lib/prisma.ts` throws if `DATABASE_URL` is missing
- Because the homepage imports the Prisma-backed portfolio section, the app also needs database access when rendering `/`
- The project currently trusts the host directly in `auth.ts`, so `AUTH_TRUST_HOST` is not required in the environment at this time
- Next.js 16 deprecates `middleware.ts` in favor of `proxy.ts`, but this project currently avoids proxy-based auth and protects the admin route inside app runtime code instead
- With `cacheComponents: true`, request-time APIs like auth cookies and `searchParams` must live behind `<Suspense>` unless fully cached

## Roadmap Direction

- Harden and refine `/admin` owner-only auth
- Expand admin capabilities beyond portfolio management
- Keep reducing unnecessary database reads on the free Neon tier
- Keep the public site professional, minimal, and Spanish-first
- Add English support later if needed
