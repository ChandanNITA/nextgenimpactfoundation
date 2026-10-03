# CLAUDE.md — NextGen Impact Foundation

> Read this file before making any changes to this project.

## Project Overview

**Organization:** NextGen Impact Foundation
**Tagline:** *Youth Today, Impact Tomorrow*
**Five Pillars:** Educate · Empower · Support · Environment · Community

A professional NGO website that builds trust with donors, engages volunteers,
showcases programs and impact, and converts visitors into supporters.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + Shadcn UI |
| Content | TypeScript data files in `data/` |
| Forms | Web3Forms API (free, zero backend) |
| Validation | Zod (client + server) |
| Hosting | Vercel free tier |
| Icons | Lucide React |

## Architecture Principles

1. **Server Components first** — use `'use client'` only for interactive UI
2. **Static Generation** — every page is statically generated
3. **No database (Phase 1)** — all content in TypeScript/MDX files
4. **Free tiers only** — never introduce paid services without approval
5. **Type safety everywhere** — no `any`, no `@ts-ignore`
6. **Progressive complexity** — start simple, add as needed

## Brand Colors (from logo)

```
Navy Blue:    #1B3A8A  (primary — trust)
Forest Green: #16A34A  (secondary — growth)
Gold/Amber:   #F59E0B  (accent — CTAs, highlights)
Dark:         #0F172A  (text)
Background:   #F8FAFC  (off-white)
```

## Directory Structure

```
app/              Pages and API routes (Next.js App Router)
  (marketing)/    Route group for public pages
components/       Reusable UI components
  layout/         Navbar, MobileMenu, Footer
  home/           Homepage section components
  forms/          Form components
  ui/             Shadcn UI primitives
data/             Static content (TypeScript files)
lib/              Utilities (metadata, validators, helpers)
hooks/            Custom React hooks
types/            TypeScript interfaces
public/           Static assets (logo, images)
```

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint
npm run typecheck    # TypeScript check
```

## Coding Conventions

- **Imports:** Use `@/` alias, never relative `../../../`
- **Components:** PascalCase filenames, named exports (except pages)
- **Server Components by default** — add `'use client'` only when needed
- **All images:** Use `next/image`, never raw `<img>`
- **Forms:** Validate with Zod on both client and server
- **Semantic HTML:** `<nav>`, `<main>`, `<article>`, `<section>`
- **Accessibility:** All images need alt text, labels on form inputs

## Content Management

All content lives in `data/` as TypeScript files:
- `data/programs.ts` — Program entries
- `data/events.ts` — Event entries
- `data/team.ts` — Team members
- `data/impact.ts` — Impact statistics
- `data/testimonials.ts` — Testimonials
- `data/partners.ts` — Partner organizations

Types are defined in `types/index.ts`.

## Environment Variables

Server-side only (no `NEXT_PUBLIC_` prefix):
- `WEB3FORMS_ACCESS_KEY` — Form submission backend

See `.env.local.example` for full list.

## What NOT To Do

- Never use `<img>` — always `next/image`
- Never add `'use client'` without a reason
- Never store secrets in `NEXT_PUBLIC_` variables
- Never use `any` as a TypeScript type
- Never add a database without explicit approval
- Never use inline styles — use Tailwind classes
- Never skip alt text on images
- Never use `useEffect` for data fetching (use Server Components)
- Never commit `.env.local`
