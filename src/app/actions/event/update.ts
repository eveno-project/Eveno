'use server';
import Event from '@interfaces/event';
import { update } from '@services/event';
import { updateEventSchema } from '@validators/event.schema';
import { redirect } from 'next/navigation';
import { ZodIssue } from 'zod';
import { authOptions } from '@lib/auth';
import { getServerSession } from 'next-auth';

export default async function updateEvent(id: number, _prevState: any, params: FormData) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        redirect('/');
    }
    const userId = session?.user.id;
    const validation = updateEventSchema.safeParse({
        id: id,
        adult: params.get('adult') ? true : false,
        description: params.get('description') as string,
        endDate: params.get('endDate'),
        linkTicketing: params.get('linkTicketing')?.toString(),
        startDate: params.get('startDate'),
        publishedAt: params.get('publishedAt') ?? undefined,
        title: params.get('title')?.toString(),
        localizations: {
            id: +params.get('idLocalization')!.toString(),
            address: params.get('address'),
            city: params.get('city'),
            regionName: params.get('regionName'),
            zipCode: params.get('zipCode'),
            longitude: 0,
            latitude: 0,
        },
        tags: params.getAll('tags').map(tag => ({ id: Number(tag) })),
        user: {
            id: userId
        }
    });

    if (!validation.success) {
        console.error({
            issues: validation.error.issues
        });
        return {
            errors: validation.error.issues as ZodIssue[]
        };
    }

    await update(validation.data as unknown as Event);

    redirect(`/event/${id}`);
}
