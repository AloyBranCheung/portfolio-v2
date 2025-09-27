import seedExperience from './experience'

const main = async () => {
  await seedExperience()
  console.log('Done seeding')
  process.exit(0)
}

main()
