import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'
import type { Project } from '@/payload-types'
import { generateDate } from '@/libs/dayjs'

const projects: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Vantage Carbon Intelligence',
    technologies: ['Next.js', 'Python', 'TypeScript', 'AWS', 'Terraform'],
    link: 'https://www.brandoncheung.dev/tower-blocks',
    yearWorkedOn: generateDate('2022-04-01'),
  },
]

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Migration code
  await payload.create({
    collection: 'technologies',
    data: {
      name: 'Terraform',
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
  // Migration code
  await payload.delete({
    collection: 'technologies',
    where: {
      name: {
        equals: 'Terraform',
      },
    },
  })

  await payload.delete({
    collection: 'projects',
    where: {
      name: {
        equals: 'Vantage Carbon Intelligence',
      },
    },
  })
}
