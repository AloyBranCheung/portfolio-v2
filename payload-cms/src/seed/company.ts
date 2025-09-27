import getPayloadInstance from '@/libs/payload'

const seedCompany = async () => {
  const payload = await getPayloadInstance()
  const companies = [
    { name: 'University of Toronto' },
    { name: 'Toronto General Hospital' },
    { name: 'ClearBlue Markets' },
    { name: 'University of Toronto Faculty of Nursing' },
    { name: 'University Health Network' },
  ]

  for (const company of companies) {
    await payload.create({
      collection: 'company',
      data: company,
    })
  }

  console.log('Successfully seeded companies.')
}

export default seedCompany