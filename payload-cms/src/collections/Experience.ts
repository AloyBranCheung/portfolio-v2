import { CollectionConfig } from 'payload'

// resume experience
export const Experience: CollectionConfig = {
  slug: 'experience',
  fields: [
    {
      name: 'title',
      label: 'Job Title',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      label: 'Company',
      type: 'relationship',
      relationTo: 'company',
      required: true,
    },
    {
      name: 'employmentType',
      label: 'Employment Type',
      type: 'relationship',
      relationTo: 'employment-type',
      required: true,
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      required: true,
    },
    {
      name: 'isCurrentRole',
      label: 'I am currently working in this role',
      type: 'checkbox',
      required: true,
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
    },
    {
      name: 'location',
      label: 'Location',
      type: 'relationship',
      relationTo: 'location',
    },
    {
      name: 'workType',
      label: 'Work Type',
      type: 'relationship',
      relationTo: 'work-type',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      admin: {
        description: "Use '-' as a separator for bullet points.",
        rows: 8,
      },
    },
  ],
}
