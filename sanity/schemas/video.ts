import { Rule } from '@sanity/types';

export default {
	title: 'Video',
	name: 'video',
	type: 'document',
	fields: [
		{
			title: 'Source',
			name: 'src',
			type: 'string',
			validation: (Rule: Rule) => Rule.required(),
		},
	],
	preview: {
		prepare () {
			return {
				title: 'Video',
			};
		},
	},
};