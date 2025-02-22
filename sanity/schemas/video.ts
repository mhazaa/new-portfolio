export default {
	title: 'Video',
	name: 'video',
	type: 'document',
	fields: [
		{
			title: 'Source',
			name: 'src',
			type: 'string',
			validation: (Rule: any) => Rule.required(),
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