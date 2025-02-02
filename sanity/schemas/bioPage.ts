export default {
  title: 'Bio Page',
  name: 'bioPage',
  type: 'document',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'image',
    },
    {
      title: 'Bio',
      name: 'bio',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {
                title: 'Normal',
                value: 'normal',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
		prepare () {
			return {
				title: 'Bio Page',
			}
		},
	},
};