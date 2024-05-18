import post from './post';

export default {
  title: 'Portfolio',
  name: 'portfolio',
	type: 'document',
  fields: [
    {
      title: 'Artist',
      name: 'artist',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'post',
            },
          ],
        },
      ],
    },
    {
      title: 'Writer',
      name: 'writer',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'post',
            },
          ],
        },
      ],
    },
  ],
  preview: {
		prepare () {
			return {
				title: 'Portfolio',
			}
		},
	},
}