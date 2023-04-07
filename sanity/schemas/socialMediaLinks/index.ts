export default {
  title: 'Social Media Links',
  name: 'socialMediaLinks',
  type: 'document',
  fields: [
    {
      title: 'Links',
      name: 'links',
      type: 'object',
      fields: [
        {
          title: 'Instagram',
          name: 'instagram',
          type: 'url',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
  ],
};