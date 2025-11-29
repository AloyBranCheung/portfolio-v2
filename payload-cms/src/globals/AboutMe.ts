import { GlobalConfig } from 'payload'

export const AboutMe: GlobalConfig = {
  slug: 'about-me',
  fields: [
    {
      name: 'description',
      label: 'Description',
      type: 'richText',
    },
    {
      name: 'typing-text',
      label: 'Typing Text',
      type: 'array',
      fields: [
        {
          name: 'text',
          label: 'Text',
          type: 'text',
          required: true,
          unique: true,
        },
      ],
    },
  ],
  access: {
    read: () => true,
  },
}
