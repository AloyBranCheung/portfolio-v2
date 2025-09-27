import { CollectionConfig } from 'payload'

export const EmploymentType: CollectionConfig = {
  slug: 'employment-type',
  fields: [
    {
      name: 'name',
      label: 'Employment Type',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
  admin: {
    useAsTitle: 'name',
  },
}