<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project Context

- Project name: `Digital Clip Agency`
- Stack: Next.js 16, React 19, TypeScript, App Router, Tailwind CSS 4
- Goal: build a professional portfolio website for a video editing agency while using the project to learn Next.js from the ground up

## Current Scope

### Phase 1: Public Site

- Build a single-page landing page at `/`
- Sections:
  - Home / Hero
  - Services
  - Portfolio
  - About
  - Contact
- Keep content hardcoded first
- Use a sticky navbar with smooth scrolling to sections
- Contact area should include:
  - visible email
  - `mailto:` CTA
  - copy-to-clipboard email button
  - Instagram link

### Phase 2: Admin

- Add a protected owner-only admin area later
- Start with simple auth first, not a full auth system
- Initial admin scope: manage portfolio items only

## Brand Direction

- Primary language for v1: Spanish
- English/Spanish can be added later
- Visual direction: dark, premium, cinematic, creator-focused
- Preferred palette:
  - deep navy background
  - blue / cyan accents
  - white text
- Do not use yellow as a core UI color in v1
- Reference images live in `public/reference/`

## Content Direction

- Target audience: creators
- Focus platforms:
  - YouTube
  - Instagram
  - TikTok
- Service themes from brand references:
  - video production
  - content creation
  - visual storytelling / visual narration
  - social media content optimization
- Portfolio section can start with placeholder cards until final project data is provided
- No testimonials yet

## Architecture Rules

- Keep `app/page.tsx` as the route entry, not a giant page file
- Extract landing sections into `components/landing/`
- Put reusable UI in `components/shared/`
- Keep hardcoded site content in `lib/site-data.ts`
- Use Server Components by default
- Use Client Components only for browser interactivity
  - examples: mobile menu, copy-email button
- Do not add `"use client"` unnecessarily

## Planned Structure

```txt
app/
  layout.tsx
  page.tsx
  globals.css
  admin/
    page.tsx

components/
  landing/
    hero-section.tsx
    services-section.tsx
    portfolio-section.tsx
    about-section.tsx
    contact-section.tsx
  shared/
    navbar.tsx
    footer.tsx
    section-heading.tsx
    copy-email-button.tsx

lib/
  site-data.ts
  navigation.ts

public/
  reference/
  brand/
  portfolio/
```

## Build Order

1. Define design tokens and content structure
2. Set up section architecture and metadata
3. Build sticky navbar and hero
4. Build services section
5. Build portfolio grid with placeholder content
6. Build about section
7. Build contact section
8. Add footer
9. Polish responsive behavior and assets
10. Add metadata and SEO refinements
11. Add admin/auth later

## Working Notes

- The landing page references are inspiration, not layouts to copy literally
- Prefer clean web layout decisions over reproducing social-media poster compositions
- Keep v1 minimal, professional, and scalable for later admin integration
