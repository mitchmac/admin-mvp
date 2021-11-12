import { defineSchema } from '@tinacms/cli';

export default defineSchema({collections: [
        {
            label: 'Pages',
            name: 'page',
            path: 'content/',
            fields: [
                {
                    type: 'string',
                    label: 'Title',
                    name: 'title',
                }
            ],
        },
    ]
})