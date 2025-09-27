import getPayloadInstance from '@/libs/payload'

const seedLocation = async () => {
  const payload = await getPayloadInstance()
  const locations = [
    { name: 'Toronto, Canada' },
    { name: 'Remote' },
  ]

  for (const location of locations) {
    await payload.create({
      collection: 'location',
      data: location,
    })
  }

  console.log('Successfully seeded locations.')
}

export default seedLocation