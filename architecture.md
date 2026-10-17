# NextGen Impact Foundation - Architecture Overview

This document outlines the architecture, technology stack, and directory structure of the NextGen Impact Foundation web application.

## 1. Technology Stack

The application has been migrated from Next.js (App Router) to a modern, lightweight Single Page Application (SPA) architecture.

- **Framework**: React 19 (with TypeScript)
- **Build Tool**: Vite (Lightning-fast HMR and optimized production builds)
- **Routing**: React Router (`react-router-dom`) for client-side navigation
- **Styling**: Tailwind CSS (Utility-first CSS framework)
- **Icons**: Lucide React
- **Forms API**: Web3Forms (Direct client-side form submissions)
- **Database & Realtime**: Supabase (PostgreSQL with Row Level Security for testimonials)
- **Deployment Strategy**: Static Site Generation / SPA Hosting (e.g., Vercel, Netlify, Cloudflare Pages)

## 2. Directory Structure

All application source code resides in the `src/` directory.

```
src/
├── app/                  # Global stylesheets (e.g., globals.css)
├── components/           # Reusable React components
│   ├── blog/             # Blog-related UI components
│   ├── events/           # Event-related UI components
│   ├── forms/            # Contact, Newsletter, Partner, and Volunteer forms
│   ├── gallery/          # Image gallery components
│   ├── home/             # Landing page components (HeroSlider, TestimonialsSlider, etc.)
│   ├── layout/           # Shared layout components (Navbar, Footer, MobileMenu)
│   ├── programs/         # Program and initiative components
│   └── testimonials/     # Testimonial submission modal & community components
├── data/                 # Static JSON/TS data
├── hooks/                # Custom React hooks (e.g., useIntersectionObserver)
├── lib/                  # Utility functions, constants, and validation schemas
├── pages/                # Route-level page components (e.g., Home, About, Contact, Admin)
│   └── admin/            # Administrative pages (e.g., Testimonials moderation)
├── services/             # API and database service layers (e.g., testimonials.ts)
├── types/                # TypeScript interface and type definitions
├── App.tsx               # Central React Router configuration
├── main.tsx              # Application entry point and DOM rendering
└── vite-env.d.ts         # Vite and environment variable type declarations
```

## 3. Key Architectural Decisions

### A. Routing (React Router)
Navigation is entirely client-side. The routing map is centrally defined in `src/App.tsx`. All pages correspond to files inside the `src/pages/` directory. Dynamic routes (e.g., `/blog/:slug`) use React Router's `useParams` hook to extract URL parameters and load the corresponding data.

### B. Form Handling (Web3Forms)
To keep contact/volunteer/partner forms serverless, submissions post directly to the Web3Forms API using native `FormData`.

### C. Dynamic Database & Moderation (Supabase Testimonials)
Testimonials are completely database-driven:
- **Database Engine**: Supabase (Free-tier PostgreSQL with Row Level Security).
- **Submission Workflow**: Public users submit reviews via `TestimonialModal` or `/submit-testimonial`. Records are stored with `status = 'pending'`.
- **Row Level Security (RLS)**:
  - `anon` visitors can INSERT only with `status = 'pending'` and consent.
  - `anon` visitors can SELECT only records where `status = 'approved'`.
- **Moderation Panel**: Accessible at `/admin/testimonials` behind an authentication gate. Admins can review pending submissions and click **Approve & Publish**, instantly publishing them to the public slider without any code changes.
- **Offline / Local Fallback**: When Supabase credentials are not set in `.env.local`, a persistent local storage engine handles records so the entire workflow can be tested immediately.

### D. Environment Variables
Because the application is built with Vite, all environment variables exposed to the client must be prefixed with `VITE_`.
- Local development variables are stored in `.env.local`.
- Keys: `VITE_WEB3FORMS_ACCESS_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_ADMIN_PASSCODE`.

## 4. Performance Optimizations
- **Asset Optimization**: Images are served from the `public/images/` folder.
- **Component Code Splitting**: Route-based modular architecture in `App.tsx`.
- **CSS Purging**: Tailwind CSS automatically purges unused styles during the `vite build` process.

