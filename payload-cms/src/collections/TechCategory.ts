import { CollectionConfig } from 'payload'

export const TechCategory: CollectionConfig = {
  slug: 'tech-category',
  fields: [
    {
      name: 'name',
      label: 'Category',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'order',
      label: 'Order',
      type: 'number',
    },
  ],
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
}
