export default {
  title: 'Bio Page',
  name: 'bioPage',
  type: 'document',
  fields: [
    {
      title: 'Bio',
      name: 'bio',
      type: 'array',
      of: [
          {
              type: 'block',
          },
      ],
      validation: (Rule: any) => Rule.required(),
  },
  ],
};