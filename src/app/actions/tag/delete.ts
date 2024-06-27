'use server';
import { deleteOne } from '@services/tag';
import { redirect } from 'next/navigation';
import { ZodIssue } from 'zod';

export default async function deleteTag(_prevState: any, params: FormData) {
    const id = params.get('id')?.toString();

    if (!id) {
        return {
            errors: [{
                code: 'custom',
                message: 'Le tag n\'éxiste pas',
                path: ['id']
            }] as ZodIssue[]
        }
    }

    await deleteOne(parseInt(id));

    redirect('/admin/tag');
}