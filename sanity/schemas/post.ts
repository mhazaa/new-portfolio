import { Rule } from '@sanity/types';

export default {
	title: 'Post',
	name: 'post',
	type: 'document',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			title: 'Medium',
			name: 'medium',
			type: 'string',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			title: 'Year',
			name: 'year',
			type: 'string',
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			title: 'Category',
			name: 'category',
			type: 'string',
			options: {
				list: [
					{
						title: 'Artist',
						value: 'artist',
					},
					{
						title: 'Writer',
						value: 'writer',
					},
				],
			},
			validation: (Rule: Rule) => Rule.required(),
		},
		{
			title: 'Publication',
			name: 'publication',
			type: 'string',
		},
		{
			title: 'Internal URL',
			name: 'internalUrl',
			type: 'string',
		},
		{
			title: 'External URL',
			name: 'externalUrl',
			type: 'string',
		},
		{
			title: 'Markdown',
			name: 'markdown',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [
						{
							title: 'Normal',
							value: 'normal',
						},
						{
							title: 'Prose Left',
							value: 'proseLeft',
						},
						{
							title: 'Prose Center',
							value: 'proseCenter',
						},
						{
							title: 'Poetry',
							value: 'poetry',
						},
					],
				},
				{
					type: 'image',  
				},
				{
					type: 'video',  
				},
			],
		},
	],
};