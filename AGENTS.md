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
- `components/landing/portfolio-section.tsx` reads published portfolio items from Prisma
- Homepage rendering depends on database access because portfolio content comes from PostgreSQL
- Ordering is currently based on `featured`, `sortOrder`, then `createdAt`

### Admin Area

- An admin panel already exists at `/admin`
- Current admin scope: manage portfolio items only
- Supported actions:
  - create portfolio item
  - edit portfolio item
  - remove portfolio item
  - set published flag
  - set featured flag
  - set sort order
- Admin UI currently uses server actions plus a client modal context
- Admin/auth protection is not implemented yet

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

## Current Structure

```txt
app/
  layout.tsx
  page.tsx
  globals.css
  not-found.tsx
  admin/
    layout.tsx
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
    update-item-button.tsx
    remove-item-button.tsx
    portfolio-table.tsx
    portfolio-modal.tsx
    portfolio-modal-wrapper.tsx

contexts/
  portfolio-modal-context.tsx

lib/
  navigation.ts
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
```

## Data And State Rules

- Static marketing copy belongs in `lib/site-data.ts`
- Portfolio items belong in PostgreSQL through Prisma
- Published filtering for the public portfolio should remain enforced at the query level
- Admin pages can query full portfolio data sets
- Modal open/edit/create state is currently handled with `PortfolioModalProvider`
- Validation for admin portfolio mutations should continue to live next to the actions workflow

## Database Notes

- Prisma schema currently defines:
  - `User`
  - `PortfolioItem`
- `PortfolioItem` is mapped to the `Projects` table
- The app requires `DATABASE_URL`
- The seed script creates local bootstrap users and sample portfolio items
- Do not assume auth exists just because `User` exists in Prisma

## Near-Term Priorities

1. Protect `/admin` with simple owner-only authentication
2. Keep improving portfolio management before expanding admin scope
3. Polish responsive behavior and visual consistency across the landing page
4. Refine metadata and SEO where useful
5. Add multilingual support later only if there is a concrete need

## Working Notes

- The landing page references are inspiration, not layouts to copy literally
- Prefer clean web layout decisions over reproducing social-media poster compositions
- Preserve the established visual language already present in the implemented landing sections
- Be careful when changing the portfolio section because it affects both homepage rendering and admin-managed content
- If touching setup docs or local workflow, remember the repo currently uses `npx tsx prisma/seed.ts` for seeding and not a package script
