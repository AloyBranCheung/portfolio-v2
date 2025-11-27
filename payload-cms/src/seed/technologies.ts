import getPayloadInstance from '@/libs/payload'

const seedTechnologies = async () => {
  const payload = await getPayloadInstance()
  const technologies = [
    {
      name: 'JavaScript',
    },
    {
      name: 'TypeScript',
    },
    {
      name: 'React',
    },
    {
      name: 'Next.js',
    },
    {
      name: 'Python',
    },
    {
      name: 'PostgreSQL',
    },
    {
      name: 'FastAPI',
    },
    {
      name: 'SQLAlchemy',
    },
    {
      name: 'Strapi CMS',
    },
    {
      name: 'Drupal CMS',
    },
    {
      name: 'PHP',
    },
    {
      name: 'AWS',
    },
  ]

  for (const technology of technologies) {
    await payload.create({
      collection: 'technologies',
      data: technology,
    })
  }

  console.log('Successfully seeded technologies.')
}

export default seedTechnologies
