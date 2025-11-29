import getPayloadInstance from '@/libs/payload'

const seedAboutMe = async () => {
  const payload = await getPayloadInstance()

  await payload.updateGlobal({
    slug: 'about-me',
    data: {
      description: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'I am an enthusiastic web developer with a keen interest in crafting exceptional digital experiences.',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: null,
              textStyle: '',
              textFormat: 0,
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [],
              direction: null,
              textStyle: '',
              textFormat: 0,
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'I offer professional expertise in web development, with hands-on experience in React and Next.js, as well as CMS platforms like Strapi and Drupal. My backend proficiency includes Node.js with Express and Prisma ORM, Python with FastAPI and SQLAlchemy ORM, and databases such as PostgreSQL and MongoDB. Additionally, I have experience managing AWS infrastructure using Terraform. My skill set spans the full stack, enabling me to deliver end-to-end solutions.',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: null,
              textStyle: '',
              textFormat: 0,
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [],
              direction: null,
              textStyle: '',
              textFormat: 0,
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: 'A fun fact about me is that in 2018 I paddled in the Club Crews World Championship for my Dragonboat team (not to be confused with Dragon Ball Z) in Hungary and our team received eight gold medals!',
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: null,
              textStyle: '',
              textFormat: 0,
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [],
              direction: null,
              textStyle: '',
              textFormat: 0,
            },
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  mode: 'normal',
                  text: "Let's connect!",
                  type: 'text',
                  style: '',
                  detail: 0,
                  format: 0,
                  version: 1,
                },
              ],
              direction: null,
              textStyle: '',
              textFormat: 0,
            },
          ],
          direction: null,
        },
      },
    },
  })

  console.log('Successfully seeded AboutMe global.')
}

export default seedAboutMe
