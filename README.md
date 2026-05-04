# Digital Clip Agency

Single-page portfolio site for a video editing agency built with Next.js 16, React 19, TypeScript, App Router, and Tailwind CSS 4.

## Current Scope

- Public landing page at `/`
- Sections: Hero, Services, Portfolio, About, Contact
- Content is hardcoded in `lib/site-data.ts`
- Smooth-scrolling sticky navigation
- Contact area includes email, `mailto:` CTA, copy-to-clipboard button, and Instagram link

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- App Router

## Project Structure

```txt
app/
  layout.tsx
  page.tsx
  globals.css
  admin/
    page.tsx

components/
  landing/
  shared/

lib/
  site-data.ts
  navigation.ts
```

## Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Verification

Lint:

```bash
npm run lint
```

Type check:

```bash
npm run typecheck
```

Production build:

```bash
npm run build
```

## Content

- Landing page content lives in `lib/site-data.ts`
- Navigation links live in `lib/navigation.ts`
- Brand/reference assets live in `public/`

## Environment Variables

No environment variables are required yet for the public site.

An empty `.env.example` is included to reserve the shape for future admin/auth work.

## Notes

- Use plain `<a href="#section-id">` links for same-page section navigation
- Use `next/link` for route-to-route navigation
- `ScrollReveal` is used for entrance motion; above-the-fold hero content is configured to render visible immediately
