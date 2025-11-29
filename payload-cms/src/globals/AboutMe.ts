import { GlobalConfig } from 'payload'

export const AboutMe: GlobalConfig = {
  slug: 'about-me',
  fields: [
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
    },
  ],
  access: {
    read: () => true,
  },
}
