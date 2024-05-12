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
        post,
      ],
    },
    {
      title: 'Writer',
      name: 'writer',
      type: 'array',
      of: [
        post,
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