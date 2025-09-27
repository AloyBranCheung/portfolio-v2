import { generateDate } from '@/libs/dayjs'
import getPayloadInstance from '@/libs/payload'
import { Experience } from '@/payload-types'

const seedExperience = async () => {
  const payload = await getPayloadInstance()
  const experiences: (Omit<Experience, 'createdAt' | 'id' | 'updatedAt'> &
    Partial<Pick<Experience, 'createdAt' | 'id' | 'updatedAt'>>)[] = [
    {
      title: 'Application Programmer Analyst',
      employmentType: 'Contract Full-time',
      isCurrentRole: true,
      startDate: generateDate('2025-04-01'),
      location: 'Toronto, Canada',
      workType: 'Hybrid',
      description: 'Full-stack Development for the University of Toronto Libraries.',
    },
  ]
  const tasks = []

  for (let i = 0; i < experiences.length; i++) {
    const currExperience = experiences[i]

    const createExperience = async () => {
      await payload.create({
        collection: 'experience',
        data: currExperience,
      })
    }

    tasks.push(createExperience())
  }

  await Promise.all(tasks)
  console.log('Successfully seeded experiences.')
}

export default seedExperience
