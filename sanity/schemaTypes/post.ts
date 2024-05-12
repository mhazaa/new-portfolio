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
                    type: 'block',
                },
                {
                    type: 'image',  
                },
            ],
        },
    ],
};