# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A portfolio website built as two separate apps in an npm workspace:
- **`frontend/`** — Next.js 16 app (React 19, Tailwind CSS v4, Three.js/R3F for 3D, Jotai, GSAP/Motion)
- **`payload-cms/`** — PayloadCMS v3 running as a standalone Next.js app (separate service from frontend)

The two apps communicate: frontend fetches data from the CMS REST API at `BACKEND_URL`. Everything runs via Docker Compose locally (Postgres on 5432, Payload on 3001, Frontend on 3000).

## Commands

All commands run from the repo root unless noted.

### Development

```bash
npm run dev                   # Start all services via Docker Compose
npm run dev:cms               # Start only payload-cms (no Docker)
npm run dev:frontend          # Start only frontend (no Docker)
```

### Installing packages

```bash
npm i <package> --workspace=frontend
npm i <package> --workspace=payload-cms
```

### Linting

```bash
npm run lint --workspace=frontend
npm run lint --workspace=payload-cms
```

### Testing

```bash
# Frontend (vitest + jsdom + @testing-library/react)
npm run test --workspace=frontend

# Payload CMS — integration tests (requires live DB)
cd payload-cms && pnpm run test:int

# Payload CMS — e2e tests (Playwright)
cd payload-cms && pnpm run test:e2e
```

### Payload CMS CLI (run from payload-cms/)

```bash
cd payload-cms
pnpm run payload migrate            # Run pending migrations
pnpm run generate:types             # Regenerate payload-types.ts
pnpm run generate:importmap         # Regenerate import map
```

### Seeding / DB restore

```bash
npm run seed                        # Run seed script (from root, targets .env DATABASE_URI)

# Or restore from db.sql dump:
psql -d postgres://local:local@localhost:5432/local -f ./db.sql
```

### Production build test

```bash
docker compose up -d frontend-prod --build
# Visit http://localhost:8000
```

## Architecture

### Data flow

Frontend server components call `BACKEND_URL` (Payload REST API) directly at build/request time with ISR (`revalidate: 3600`). There is no shared local API — every CMS query goes over HTTP.

Payload uses `qs-esm` for query string serialization (not the built-in `qs`); use `stringify` from `qs-esm` when building Payload `Where` queries in the frontend.

### Frontend (`frontend/src/`)

- `app/` — Next.js App Router pages. Pages are server components that fetch from `BACKEND_URL`.
- `app/api/` — API route handlers that proxy CMS responses to the client:
  - `/api/media/[...path]` — proxies media files from Payload (resolves filename → Vercel Blob URL)
  - `/api/certification` — cached certification data
  - `/api/og` — Open Graph image generation
- `app/resume.pdf/` — Route that fetches the resume PDF from Payload media and serves it inline
- `components/` — React components; `components/ui/` holds shadcn/Radix primitives
- `components/game/` — Tower Blocks 3D game using React Three Fiber + Rapier physics + Matter.js
- `jotai-atoms/` — Global state (Jotai)
- `lib/` — Configured singletons: `axios.ts` (baseURL = `BACKEND_URL`), `dayjs.ts`, `mixpanel.ts`, `nodemailer.ts`
- `utils/` — Data-fetching helpers (`fetch-homepage.ts`, `fetch-projects.ts`)
- `types/` — TypeScript types for CMS response shapes

### Payload CMS (`payload-cms/src/`)

- `payload.config.ts` — Central config: registers all collections/globals, configures Postgres adapter, Vercel Blob storage, and a `/health` endpoint
- `collections/` — Data models: Users, Media, Experience, Company, EmploymentType, Location, WorkType, Technologies, Projects, Certification
- `globals/` — `AboutMe` (hero section content, typing text)
- `libs/` — `payload.ts` (payload client helper), `dayjs.ts`
- `seed/` — One-time seed script (run via `npm run seed` from root)
- `payload-types.ts` — Auto-generated TypeScript types (do not edit manually; run `generate:types`)

### Storage

Media files are stored in **Vercel Blob** (configured via `BLOB_READ_WRITE_TOKEN`). The frontend `/api/media/[...path]` proxy resolves filenames to Blob URLs so client code doesn't need direct Blob access.

### Environment variables

See `.env.example`. Key variables:
- `BACKEND_URL` — Payload REST API base (e.g., `http://payload:3001/api` in Docker, `http://localhost:3001/api` locally without Docker)
- `DATABASE_URI` — Postgres connection string
- `PAYLOAD_SECRET` — Payload auth secret
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob token
- Google OAuth credentials for Nodemailer (contact form)
- Google reCAPTCHA keys (`NEXT_PUBLIC_GOOGLE_SITE_KEY`, `GOOGLE_SECRET_KEY`)
- `NEXT_PUBLIC_MIXPANEL_TOKEN` — Analytics

### Testing setup

**Frontend**: Vitest + jsdom + `@testing-library/react`. Setup file at `frontend/src/test/setup.ts` imports `@testing-library/jest-dom/vitest` and mocks `IntersectionObserver`. Path alias `@` maps to `frontend/src/`.

**Payload CMS integration**: Vitest against real Payload instance (needs `DATABASE_URI`). Tests live in `payload-cms/tests/int/`. E2e tests use Playwright in `payload-cms/tests/e2e/`.

### CI

GitHub Actions (`.github/workflows/`):
- `test-lint.yml` — runs on PRs to `main`: lints and tests the `frontend` workspace
- `payload-migrate.yml` — runs Payload migrations

### 3D Development

Use the **Triplex** VSCode extension for visual development of Three.js/R3F scenes in `components/game/`.
