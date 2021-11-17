import { defineSchema } from '@tinacms/cli';

export default defineSchema({collections: [
        {
            label: 'Pages',
            name: 'page',
            path: 'content/pages',
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