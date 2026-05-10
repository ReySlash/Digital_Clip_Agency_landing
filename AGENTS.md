<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Context

- Project name: `Digital Clip Agency`
- Stack: Next.js 16, React 19, TypeScript, App Router, Tailwind CSS 4, Prisma, PostgreSQL
- Goal: build a professional portfolio website for a video editing agency while using the project to learn Next.js from the ground up

## Current Product State

### Public Site

- The public landing page is implemented at `/`
- Sections in production: Hero, Services, Portfolio, About, Contact, Footer
- Primary language is Spanish
- Navbar is sticky and uses same-page anchor navigation with smooth scrolling
- Contact area includes:
  - visible email
  - `mailto:` CTA
  - copy-to-clipboard email button
  - Instagram link
- Most landing copy is hardcoded in `lib/site-data.ts`

### Portfolio Data

- The portfolio section is not placeholder-only anymore
- `components/landing/portfolio-section.tsx` reads published portfolio items through a cached data layer in `lib/portfolio-data.ts`
- Homepage rendering depends on database access because portfolio content comes from PostgreSQL
- Ordering is currently based on `featured`, `sortOrder`, then `createdAt`
- Public and admin portfolio reads are cached with Next.js 16 Cache Components and invalidated by admin mutations

### Admin Area

- An admin panel already exists at `/admin`
- A dedicated login page exists at `/admin/login`
- Current admin scope: manage portfolio items only
- Supported actions:
  - create portfolio item
  - edit portfolio item
  - remove portfolio item
  - set published flag
  - set featured flag
  - set sort order
- Admin UI currently uses server actions plus a client modal context
- Admin/auth protection is implemented with NextAuth/Auth.js credentials login
- Only `ADMIN` role users should be able to access `/admin` and admin server actions
- Failed admin logins are rate limited in memory by IP and email key
- The admin dashboard includes a logout action and refreshed premium dark UI
- Admin mutations show inline success/error feedback instead of browser alerts
- The admin page and login page use Suspense boundaries around request-time auth/searchParams access to satisfy Next.js 16 cache requirements

## Brand Direction

- Visual direction: dark, premium, cinematic, creator-focused
- Primary language for v1: Spanish
- English/Spanish can be added later
- Preferred palette:
  - deep navy background
  - blue / cyan accents
  - white text
- Do not use yellow as a core UI color in v1
- Brand assets live in `public/brand/`
- Reference/inspiration assets may live in `public/reference/` when available

## Content Direction

- Target audience: creators
- Focus platforms:
  - YouTube
  - Instagram
  - TikTok
- Service themes:
  - video editing for short-form content
  - content optimization for growth
  - visual storytelling and clarity
  - consistent publishing support
- No testimonials yet

## Architecture Rules

- Keep `app/page.tsx` as the route entry, not a giant page file
- Keep landing sections in `components/landing/`
- Keep reusable shared UI in `components/shared/`
- Keep admin-specific UI in `components/admin/`
- Keep marketing content in `lib/site-data.ts` when it is static
- Keep navigation data in `lib/navigation.ts`
- Use Server Components by default
- Use Client Components only for browser interactivity
  - examples: mobile menu, copy-email button, modal state
- Do not add `"use client"` unnecessarily
- Prefer server actions for simple admin mutations already following the current pattern
- Keep Prisma access centralized through `lib/prisma.ts`
- Prefer testing pure logic in isolated helpers instead of coupling tests directly to framework wrappers when a small extraction keeps behavior unchanged

## Current Structure

```txt
app/
  layout.tsx
  page.tsx
  globals.css
  not-found.tsx
  admin/
    layout.tsx
    login/
      page.tsx
    page.tsx

  api/
    auth/
      [...nextauth]/
        route.ts

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
  navigation.ts
  admin-auth.ts
  auth-logic.ts
  login-abuse-protection.ts
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

test/
  setup.ts

tests/
  unit/
  components/

auth.ts
```

## Data And State Rules

- Static marketing copy belongs in `lib/site-data.ts`
- Portfolio items belong in PostgreSQL through Prisma
- Published filtering for the public portfolio should remain enforced at the query level
- Admin pages can query full portfolio data sets
- Admin authentication validates credentials against the Prisma `User` table
- Admin server actions should enforce access through `requireAdminSession()`
- Protected admin pages should use `requireAdminSession()` too so page and action auth rules stay aligned
- Portfolio reads should go through the cached helpers in `lib/portfolio-data.ts`
- Modal open/edit/create state is currently handled with `PortfolioModalProvider`
- Validation for admin portfolio mutations should continue to live next to the actions workflow
- Tests currently focus on validation, auth logic, admin auth guards, login abuse protection, mutation actions, cached data helpers, and critical admin UI behavior

## Database Notes

- Prisma schema currently defines:
  - `User`
  - `PortfolioItem`
- `PortfolioItem` is mapped to the `Projects` table
- The app requires `DATABASE_URL`
- Admin auth requires `AUTH_SECRET` and a correct `AUTH_URL`
- `auth.ts` currently enables `trustHost: true` directly, so `AUTH_TRUST_HOST` is not a required env var right now
- The seed script creates sample portfolio items and one admin user from explicit local env variables
- Seeding is blocked in production (`NODE_ENV` check in `prisma/seed.ts`)
- Do not add default bootstrap credentials to the repo; local admin login should come from developer-provided env values during seeding
- Cache invalidation for portfolio mutations is handled with `updateTag`
- Login abuse protection is intentionally in-memory and scoped to a single app instance
- Vitest + Testing Library are configured for local automated testing

## Near-Term Priorities

1. Protect `/admin` with simple owner-only authentication
2. Keep improving portfolio management before expanding admin scope
3. Polish responsive behavior and visual consistency across both landing and admin UI
4. Refine metadata and SEO where useful
5. Add multilingual support later only if there is a concrete need

## Working Notes

- The landing page references are inspiration, not layouts to copy literally
- Prefer clean web layout decisions over reproducing social-media poster compositions
- Preserve the established visual language already present in the implemented landing sections
- Be careful when changing the portfolio section because it affects both homepage rendering and admin-managed content
- If touching setup docs or local workflow, remember the repo currently uses `npx tsx prisma/seed.ts` for seeding and not a package script
- If touching deployment docs or config, document `npx prisma migrate deploy` as the production migration path
- Do not document or automate production seeding; production should use committed migrations only
- `AUTH_URL` must match the deployed origin exactly or login redirects can break
- For auth protection, prefer app runtime checks on protected admin routes instead of the deprecated `middleware.ts` path in Next.js 16
- With `cacheComponents: true`, do not await request-time APIs like auth, cookies, headers, or `searchParams` directly at the route root without a Suspense boundary
- Auth.js sign-in success and failure redirects rely on thrown redirect control flow, so route-level wrappers must not swallow those errors
- `npm run test`, `npm run test:watch`, and `npm run test:coverage` are available for the current test suite
