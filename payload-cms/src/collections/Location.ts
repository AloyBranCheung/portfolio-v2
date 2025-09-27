import { CollectionConfig } from 'payload'

export const Location: CollectionConfig = {
  slug: 'location',
  fields: [
    {
      name: 'name',
      label: 'Location',
      type: 'text',
      required: true,
      unique: true,
    },
  ],
}