# Data Models

## Overview

This project currently uses two Prisma models:

- `User`
- `PortfolioItem`

The schema lives in `prisma/schema.prisma`.

## User

Represents an internal account used for admin authentication.

Fields:

- `id`: Prisma `cuid()` primary key
- `name`: display name used in the admin UI
- `email`: unique login identifier
- `passwordHash`: bcrypt hash used by the credentials login flow
- `role`: enum value from `UserRole`
- `createdAt`: record creation timestamp
- `updatedAt`: auto-updated timestamp

### UserRole

Current enum values:

- `ADMIN`
- `DEV`

## PortfolioItem

Represents a portfolio project that can appear on the public homepage and in the admin panel.

Fields:

- `id`: Prisma `cuid()` primary key
- `title`: project title
- `platform`: target platform, currently YouTube / Instagram / TikTok
- `thumbnail`: thumbnail image URL
- `href`: public destination URL
- `description`: project summary
- `published`: whether the item is visible on the public site
- `featured`: whether the item should be prioritized visually
- `sortOrder`: manual ordering control
- `createdAt`: record creation timestamp
- `updatedAt`: auto-updated timestamp

### Database Mapping

- `PortfolioItem` is mapped to the `Projects` table with `@@map("Projects")`

## Auth Notes

- Admin authentication uses NextAuth/Auth.js credentials provider
- Login checks `User.email` and validates `passwordHash` with bcrypt
- Auth configuration lives in `auth.ts`
- The auth route handler lives at `app/api/auth/[...nextauth]/route.ts`
- The login screen lives at `app/admin/login/page.tsx`

## Public Filtering Rules

- The homepage portfolio section only reads published portfolio items
- The admin panel can read the full dataset, including drafts and featured metadata

## Seeded Local Users

The local seed script creates bootstrap users for development:

- `admin@digitalclipagency.com`
- `dev@digitalclipagency.com`

Passwords are currently defined in `prisma/seed.ts` and should be treated as local-only bootstrap credentials.
