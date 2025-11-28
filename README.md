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

## Config

- Next.js Frontend - localhost:3000
- Payload CMS - localhost:3001
- Postgres - localhost:5432
