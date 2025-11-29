import seedCompany from './company'
import seedEmploymentType from './employmentType'
import seedLocation from './location'
import seedWorkType from './workType'
import seedExperience from './experience'
import seedTechnologies from './technologies'
import seedAboutMe from './aboutMe'

const main = async () => {
  // seed these enums first
  await seedTechnologies()
  await seedWorkType()
  await seedEmploymentType()
  //
  await seedCompany()
  await seedLocation()
  await seedExperience()
  await seedAboutMe()
  console.log('Done seeding')
  process.exit(0)
}

main()
