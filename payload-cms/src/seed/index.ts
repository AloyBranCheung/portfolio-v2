import seedCompany from './company'
import seedEmploymentType from './employmentType'
import seedLocation from './location'
import seedWorkType from './workType'
import seedExperience from './experience'

const main = async () => {
  await seedCompany()
  await seedEmploymentType()
  await seedLocation()
  await seedWorkType()
  await seedExperience()
  console.log('Done seeding')
  process.exit(0)
}

main()
