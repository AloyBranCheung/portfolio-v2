import getPayloadInstance from '@/libs/payload'

const seedWorkType = async () => {
  const payload = await getPayloadInstance()
  const workTypes = [
    { name: 'On-site' },
    { name: 'Remote' },
    { name: 'Hybrid' },
  ]

  for (const workType of workTypes) {
    await payload.create({
      collection: 'work-type',
      data: workType,
    })
  }

  console.log('Successfully seeded work types.')
}

export default seedWorkType