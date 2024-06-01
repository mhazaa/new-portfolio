export default {
    title: 'Post',
    name: 'post',
    type: 'document',
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
            validation: (Rule: any) => Rule.required(),
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