import { CollectionConfig } from 'payload'

export const WorkType: CollectionConfig = {
  slug: 'work-type',
  fields: [
    {
      name: 'name',
      label: 'Work Type',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
  admin: {
    useAsTitle: 'name',
  },
}