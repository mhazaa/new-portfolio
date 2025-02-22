export default {
	title: 'Resume',
	name: 'resume',
	type: 'document',
	fields: [
		{
			title: 'Resume',
			name: 'resume',
			type: 'file',
			validation: (Rule: any) => Rule.required(),
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