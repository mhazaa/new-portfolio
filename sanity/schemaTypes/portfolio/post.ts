export default {
    title: 'Post',
    name: 'post',
    type: 'object',
    fields: [
        {
            title: 'Post ID',
            name: 'postId',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
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
            title: 'URL',
            name: 'url',
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