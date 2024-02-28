export default {
    title: 'Post',
    name: 'post',
    type: 'object',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: 'Medium',
            name: 'medium',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: 'Year',
            name: 'year',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: 'Publication',
            name: 'publication',
            type: 'string',
        },
        {
            title: 'URL',
            name: 'url',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            title: 'Is External',
            name: 'isExternal',
            type: 'boolean',
            initialValue: false,
        },
        {
            title: 'Markdown',
            name: 'markdown',
            type: 'array',
            of: [
                {
                    type: 'block'
                },
                {
                    type: 'image',
                    fields: [
                        {
                            title: 'Alt',
                            name: 'alt',
                            type: 'text',
                            description: 'alt description',
                            options: {
                                isHighlighted: true,
                            },
                        },
                    ],
                },
            ],
        },
    ],
};