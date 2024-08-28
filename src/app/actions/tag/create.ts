'use server';
import Tag from '@interfaces/tag';
import { create, getTagByNameVerif } from '@services/tag';
import { TagSchema } from '@validators/tag.schema';
import { redirect } from 'next/navigation';
import { ZodIssue } from 'zod';

export default async function createTag(_prevState: any, params: FormData) {
    const name = params.get('name');
   if (!name) {
        return {
            errors: [{
                code: 'too_small',
                minimum: 1,
                message: 'Le champs nom est obligatoire',
                path: ['name'],
                type: 'string',
            }] as ZodIssue[]
        }
   }
    const validation = TagSchema.safeParse({
        name: params.get('name')
    });

    const existingTag = await getTagByNameVerif(name.toString());
    if (existingTag) {
        return {
            errors: [{
                code: 'not_multiple_of',
                multipleOf: 1,
                path: ['name'],
                message: 'Tag déjà éxistant'
            }] as ZodIssue[]
        }
    }

    await create(validation.data as unknown as Omit<Tag, 'id'>);

    redirect('/admin/tag');
}

