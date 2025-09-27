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

  const getCompanyId = (name: string) => companies.docs.find((c) => c.name === name)?.id!
  const getEmploymentTypeId = (name: string) =>
    employmentTypes.docs.find((e) => e.name === name)?.id!
  const getLocationId = (name: string) => locations.docs.find((l) => l.name === name)?.id!
  const getWorkTypeId = (name: string) => workTypes.docs.find((w) => w.name === name)?.id!

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
    },
    {
      title: 'Full-stack Developer',
      employmentType: getEmploymentTypeId('Permanent Full-time'),
      isCurrentRole: false,
      startDate: generateDate('2023-07-01'),
      endDate: generateDate('2025-04-01'),
      location: getLocationId('Toronto, Canada'),
      workType: getWorkTypeId('Hybrid'),
      description: `
      - Merged two Postgres databases into one and transitioned codebase to utilize
        SQLAlchemy ORM, resulting in the decommissioning of a middleman service and
        speeding up requests by 40%
      - Developed a new custom CMS solution using React/Vite and RTKQuery
      - Utilized Python/FastAPI/Postgres to develop the backend service for the new CMS
      - Developed and maintained core API service using FastAPI and Python
`.trim(),
      company: getCompanyId('ClearBlue Markets'),
    },
    {
      title: 'Frontend Developer',
      employmentType: getEmploymentTypeId('Permanent Full-time'),
      isCurrentRole: false,
      startDate: generateDate('2022-10-01'),
      endDate: generateDate('2023-07-01'),
      location: getLocationId('Toronto, Canada'),
      workType: getWorkTypeId('Hybrid'),
      description: `
      - Designed, developed, and maintained the v2 frontend of the company’s market analysis
        web application using Next.js/Typescript, as part of the migration from v1 to v2
      - Managed end-to-end development, including frontend, backend, and infrastructure, for
        the company’s file hosting and emailing service on AWS using Typescript, Python and
        Terraform
      - Deployed CI/CD pipeline using GitHub Actions to automate processes such as
        testing, linting, and container deployment/uploading to registry
`.trim(),
      company: getCompanyId('ClearBlue Markets'),
    },
    {
      title: 'Registered Nurse',
      employmentType: getEmploymentTypeId('Permanent Full-time'),
      isCurrentRole: false,
      startDate: generateDate('2021-08-01'),
      endDate: generateDate('2022-08-01'),
      location: getLocationId('Toronto, Canada'),
      workType: getWorkTypeId('On-site'),
      description: `
      TGH 4PMB Cardiovascular Surgery/Cardiac Short Stay

      Pre/Post-op management of electrophysiology, cardiovascular and vascular surgery patients who had: CABG, Valve repair/replacement, TAAA, TAVI, PPM implant/explant, arrhythmia ablation, PCIs, congenital heart defects, and amputations. Involved in assisting care of LVAD patients. 

      Management of temporary pacemakers, tracheostomies, chest tubes, able to do IV bloodwork/insertions/medication administration, able to work well under pressure as a team with good communication in high pressure acute situations.

      Teaching/Mentoring: Teaching/Training clinical group students and one-to-one preceptorship with consolidation nursing students to be new graduate entry level nurses.
      `,
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
      description: 'Set-up, management and clean-up of simulation scenarios/skills labs for nursing students at the University of Toronto. Worked independently and collaboratively with co-workers and professors and provided feedback to instructors for a quality learning environment.',
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
      description: 'Compared conventional pulmonary function tests with oscillometry (Osc) in the PFT lab at the Toronto General Hospital. Helped collect and analyse data from double-lung transplant patients and bone marrow transplant patients. Compared scores between cPFT and Osc using statistical tools to analyse whether Osc provides earlier detection of acute rejection compared to cPFT.',
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
