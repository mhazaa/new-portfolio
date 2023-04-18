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
        {
          title: 'GitHub',
          name: 'github',
          type: 'url',
          validation: (Rule: any) => Rule.required(),
        },
        {
          title: 'Spotify',
          name: 'spotify',
          type: 'url',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    },
  ],
};