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
      name: 'employmentType',
      label: 'Employment Type',
      type: 'select',
      required: true,
      options: [
        'Permanent Full-time',
        'Contract Full-time',
        'Casual / On-call',
        'Contract Part-time',
      ].sort(),
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
      label: 'Location (e.g. Toronto, Canada)',
      type: 'select',
      options: ['Toronto, Canada', 'Remote'].sort(),
    },
    {
      name: 'workType',
      label: 'Work Type',
      type: 'select',
      options: ['On-site', 'Remote', 'Hybrid'].sort(),
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },
  ],
}
