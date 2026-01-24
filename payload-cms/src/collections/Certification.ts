import { CollectionConfig } from 'payload'

export const Certification: CollectionConfig = {
  slug: 'certification',
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'issuingOrganization',
      label: 'Issuing Organization',
      type: 'text',
      required: true,
    },
    {
      name: 'issueDate',
      label: 'Issue Date',
      type: 'date',
    },
    {
      name: 'expirationDate',
      label: 'Expiration Date',
      type: 'date',
    },
    {
      name: 'credentialID',
      label: 'Credential ID',
      type: 'text',
    },
    {
      name: 'credentialURL',
      label: 'Credential URL',
      type: 'text',
    },
    {
      name: 'icon',
      label: 'Icon',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
  ],
  access: {
    read: () => true,
  },
}
