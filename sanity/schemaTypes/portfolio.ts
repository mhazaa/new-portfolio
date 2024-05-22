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
          options: {
            filter: `category == 'artist'`,
          }, 
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
          options: {
            filter: `category == 'writer'`,
          },        
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