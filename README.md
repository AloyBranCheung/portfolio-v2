# Portfolio V2

## Statuses

[![Payload Migration](https://github.com/AloyBranCheung/portfolio-v2/actions/workflows/payload-migrate.yml/badge.svg)](https://github.com/AloyBranCheung/portfolio-v2/actions/workflows/payload-migrate.yml)
[![Test & Lint Frontend](https://github.com/AloyBranCheung/portfolio-v2/actions/workflows/test-lint.yml/badge.svg)](https://github.com/AloyBranCheung/portfolio-v2/actions/workflows/test-lint.yml)

## Getting Started

```bash
# install dependencies for project development
npm install

# setup envs based on .env.example
cp .env.example .env

# start development setup
npm run dev
```

> [!NOTE]  
> PayloadCMS v3.65.0 does not currently support Next.js 16. So will not be running it as one app as it was intended (e.g. local api). Also, because of this, `npm install` will use `--force` in the images.

## Installing new packages from root directory

```bash
# example
npm i package/here --workspace=frontend # or whatever workspace
```

## Seeding Data

### Run the seed script (from before I deployed the db)

**Seed Once:**
Setup the envs targeting the correct database and run `npm run seed`

### Or Cloning DB

1. `pg_dump` the `.sql` from the deployed database

```bash
# e.g.
pg_dump -d postgresql://user:password@host:port/database > db.sql
```

2. `psql -d <the connection string> -f <the .sql file>` to the local db

## Test prod build locally

```bash
# make sure payload cms is running locally

# then run, see Dockerfile.prod for more details n.b. sentry arg left out since running prod locally
docker compose up -d frontend-prod --build

# visit
http://localhost:8080
```

## Config

- Next.js Frontend - localhost:3000
- Payload CMS - localhost:3001
- Postgres - localhost:5432

## Frontend: 3D Development

- Use the Triplex Tool (vscode extension) for UI development help
