/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { generateDate } from '@/libs/dayjs'
import getPayloadInstance from '@/libs/payload'

const seedExperience = async () => {
  const payload = await getPayloadInstance()

  // Fetch relationship IDs
  const companies = await payload.find({ collection: 'company' })
  const employmentTypes = await payload.find({ collection: 'employment-type' })
  const locations = await payload.find({ collection: 'location' })
  const workTypes = await payload.find({ collection: 'work-type' })
  const technologies = await payload.find({ collection: 'technologies', limit: 0 })

  const getCompanyId = (name: string) => companies.docs.find((c) => c.name === name)?.id!
  const getEmploymentTypeId = (name: string) =>
    employmentTypes.docs.find((e) => e.name === name)?.id!
  const getLocationId = (name: string) => locations.docs.find((l) => l.name === name)?.id!
  const getWorkTypeId = (name: string) => workTypes.docs.find((w) => w.name === name)?.id!
  const getTechnologyId = (name: string) => technologies.docs.find((t) => t.name === name)?.id!

  const experiences = [
    {
      title: 'Application Programmer Analyst',
      employmentType: getEmploymentTypeId('Contract Full-time'),
      isCurrentRole: true,
      startDate: generateDate('2025-04-01'),
      location: getLocationId('Toronto, Canada'),
      workType: getWorkTypeId('Hybrid'),
      description: 'Full-stack Development for the University of Toronto Libraries.',
      company: getCompanyId('University of Toronto'),
      technologies: [
        getTechnologyId('Next.js'),
        getTechnologyId('Drupal CMS'),
        getTechnologyId('PHP'),
        getTechnologyId('TypeScript'),
      ],
    },
    {
      title: 'Full-stack Developer',
      employmentType: getEmploymentTypeId('Permanent Full-time'),
      isCurrentRole: false,
      startDate: generateDate('2023-07-01'),
      endDate: generateDate('2025-04-01'),
      location: getLocationId('Toronto, Canada'),
      workType: getWorkTypeId('Hybrid'),
      description:
        'Database optimization through merging two Postgres databases and implementing SQLAlchemy ORM, eliminating a middleman service and improving request performance by 40%. Full-stack CMS development using React/Vite frontend with RTKQuery and Python/FastAPI/Postgres backend. Core API service development and maintenance using FastAPI and Python.',
      company: getCompanyId('ClearBlue Markets'),
      technologies: [
        getTechnologyId('Next.js'),
        getTechnologyId('TypeScript'),
        getTechnologyId('Python'),
        getTechnologyId('FastAPI'),
        getTechnologyId('PostgreSQL'),
        getTechnologyId('SQLAlchemy'),
        getTechnologyId('AWS'),
        getTechnologyId('Strapi CMS'),
      ],
    },
    {
      title: 'Frontend Developer',
      employmentType: getEmploymentTypeId('Permanent Full-time'),
      isCurrentRole: false,
      startDate: generateDate('2022-10-01'),
      endDate: generateDate('2023-07-01'),
      location: getLocationId('Toronto, Canada'),
      workType: getWorkTypeId('Hybrid'),
      description:
        'Frontend development of v2 market analysis web application using Next.js/TypeScript during v1 to v2 migration. Full-stack development of AWS-based file hosting and emailing service using TypeScript, Python, and Terraform for infrastructure. CI/CD pipeline implementation with GitHub Actions for automated testing, linting, and container deployment.',
      company: getCompanyId('ClearBlue Markets'),
      technologies: [
        getTechnologyId('Next.js'),
        getTechnologyId('TypeScript'),
        getTechnologyId('Python'),
        getTechnologyId('FastAPI'),
        getTechnologyId('PostgreSQL'),
        getTechnologyId('SQLAlchemy'),
        getTechnologyId('AWS'),
        getTechnologyId('Strapi CMS'),
      ],
    },
    {
      title: 'Registered Nurse',
      employmentType: getEmploymentTypeId('Permanent Full-time'),
      isCurrentRole: false,
      startDate: generateDate('2021-08-01'),
      endDate: generateDate('2022-08-01'),
      location: getLocationId('Toronto, Canada'),
      workType: getWorkTypeId('On-site'),
      description:
        'Cardiovascular Surgery/Cardiac Short Stay unit providing pre/post-operative care for electrophysiology, cardiovascular, and vascular surgery patients including CABG, valve procedures, LVAD assistance, and various cardiac interventions. Managed medical devices including temporary pacemakers, tracheostomies, and chest tubes, performed IV procedures and medication administration in high-pressure acute care situations. Provided teaching and mentorship to nursing students through clinical training and one-to-one preceptorship.',
      company: getCompanyId('Toronto General Hospital'),
    },
    {
      title: 'Simulation Laboratory Assistant',
      employmentType: getEmploymentTypeId('Casual / On-call'),
      isCurrentRole: false,
      startDate: generateDate('2020-01-01'),
      endDate: generateDate('2021-06-01'),
      location: getLocationId('Toronto, Canada'),
      workType: getWorkTypeId('On-site'),
      description:
        'Set-up, management and clean-up of simulation scenarios/skills labs for nursing students at the University of Toronto. Worked independently and collaboratively with co-workers and professors and provided feedback to instructors for a quality learning environment.',
      company: getCompanyId('University of Toronto Faculty of Nursing'),
    },
    {
      title: 'Clinical Research Assistant',
      employmentType: getEmploymentTypeId('Permanent Full-time'),
      isCurrentRole: false,
      startDate: generateDate('2018-09-01'),
      endDate: generateDate('2019-08-01'),
      location: getLocationId('Toronto, Canada'),
      workType: getWorkTypeId('On-site'),
      description:
        'Compared conventional pulmonary function tests with oscillometry (Osc) in the PFT lab at the Toronto General Hospital. Helped collect and analyse data from double-lung transplant patients and bone marrow transplant patients. Compared scores between cPFT and Osc using statistical tools to analyse whether Osc provides earlier detection of acute rejection compared to cPFT.',
      company: getCompanyId('University Health Network'),
    },
  ]
  const tasks = []

  for (const currExperience of experiences) {
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
