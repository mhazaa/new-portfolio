import { Rule } from '@sanity/types';

export default {
	title: 'Resume',
	name: 'resume',
	type: 'document',
	fields: [
		{
			title: 'Resume',
			name: 'resume',
			type: 'file',
			validation: (Rule: Rule) => Rule.required(),
		},
	],
	preview: {
		prepare () {
			return {
				title: 'Resume',
			};
		},
	},
};