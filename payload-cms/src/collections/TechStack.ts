import { CollectionConfig } from 'payload'

export const TechStack: CollectionConfig = {
  slug: 'tech-stack',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'category',
      label: 'Category',
      type: 'relationship',
      relationTo: 'tech-category',
      required: true,
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
