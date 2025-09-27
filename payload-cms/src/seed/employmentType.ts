import getPayloadInstance from '@/libs/payload'

const seedEmploymentType = async () => {
  const payload = await getPayloadInstance()
  const employmentTypes = [
    { name: 'Permanent Full-time' },
    { name: 'Contract Full-time' },
    { name: 'Casual / On-call' },
    { name: 'Contract Part-time' },
  ]

  for (const employmentType of employmentTypes) {
    await payload.create({
      collection: 'employment-type',
      data: employmentType,
    })
  }

  console.log('Successfully seeded employment types.')
}

export default seedEmploymentType