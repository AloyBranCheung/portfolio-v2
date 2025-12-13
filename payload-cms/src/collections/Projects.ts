import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  fields: [
    {
      name: 'name',
      label: 'Project Name',
      type: 'text',
      required: true,
    },
    {
      name: 'technologies',
      label: 'Technologies Used',
      type: 'relationship',
      relationTo: 'technologies',
      hasMany: true,
    },
    {
      name: 'link',
      label: 'Project Link',
      type: 'text',
    },
    {
      name: 'yearWorkedOn',
      label: 'Year Worked On',
      type: 'date',
      required: true,
      admin: {
        description: 'The year this project was worked on',
      },
    },
    {
      name: 'madeAt',
      label: 'Made at',
      type: 'relationship',
      relationTo: 'company',
    },
  ],
  access: {
    read: () => true,
  },
}
