import { CollectionConfig } from 'payload'

export const Technologies: CollectionConfig = {
  slug: 'technologies',
  fields: [
    {
      name: 'name',
      label: 'Technology',
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
