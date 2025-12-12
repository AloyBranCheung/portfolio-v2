import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import type { Project } from '@/payload-types'
import { generateDate } from '@/libs/dayjs'

const projects: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Tower Blocks Game',
    technologies: ['Three.js', 'Next.js', 'TypeScript'],
    link: 'https://www.brandoncheung.dev/tower-blocks',
    dateCreated: generateDate('2025-12-11'),
  },
  {
    name: 'brandoncheung.dev v2',
    technologies: ['Next.js', 'Payload CMS', 'TypeScript'],
    link: 'https://www.brandoncheung.dev',
    dateCreated: generateDate('2025-12-11'),
  },
  {
    name: 'Swim Habit Tracker',
    technologies: ['Next.js', 'TypeScript', 'PrismaORM', 'PostgreSQL'],
    dateCreated: generateDate('2024-04-24'),
  },
  {
    name: 'brandoncheung.dev v1',
    technologies: ['Next.js', 'TypeScript', 'Strapi CMS'],
    dateCreated: generateDate('2022-10-17'),
  },
  {
    name: 'University of Toronto Libraries Site',
    technologies: ['Next.js', 'Drupal CMS', 'TypeScript'],
    dateCreated: generateDate('2025-09-02'),
    link: 'https://library.utoronto.ca/',
  },
  {
    name: 'Collections U of T',
    technologies: ['Next.js', 'Python', 'FastAPI', 'Loris IIIF Image Server'],
    dateCreated: generateDate('2025-09-02'),
    link: 'https://collections.library.utoronto.ca/',
  },
]

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await payload.create({
    collection: 'technologies',
    data: {
      name: 'PrismaORM',
    },
  })
  await payload.create({
    collection: 'technologies',
    data: {
      name: 'Loris IIIF Image Server',
    },
  })

  for (const project of projects) {
    const techIds = await Promise.all(
      (project.technologies as string[]).map(async (name) => {
        const tech = await payload.find({
          collection: 'technologies',
          where: { name: { equals: name } },
        })
        if (tech.docs.length < 1 || !tech.docs[0]) {
          throw new Error(`Technology ${name} not found`)
        }
        return tech.docs[0].id
      }),
    )

    await payload.create({
      collection: 'projects',
      data: { ...project, technologies: techIds },
    })
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await payload.delete({
    collection: 'technologies',
    where: {
      name: {
        equals: 'PrismaORM',
      },
    },
  })
  await payload.delete({
    collection: 'technologies',
    where: {
      name: {
        equals: 'Loris IIIF Image Server',
      },
    },
  })

  // Migration code
  await payload.delete({
    collection: 'projects',
    where: {
      id: {
        exists: true,
      },
    },
  })
}
