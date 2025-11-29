# Portfolio V2

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
> PayloadCMS v3.57.0 does not currently support Next.js 16. So will not be running it as one app as it was intended (e.g. local api).

## Seeding Data

**Seed Once:**
Setup the envs targeting the correct database and run `npm run seed`

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
