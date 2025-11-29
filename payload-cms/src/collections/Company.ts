import { CollectionConfig } from 'payload'

export const Company: CollectionConfig = {
  slug: 'company',
  fields: [
    {
      name: 'name',
      label: 'Company Name',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
}