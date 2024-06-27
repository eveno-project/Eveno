"use server";
import Event from "@interfaces/event";
import { create } from "@services/event";
import { eventSchema } from "@validators/event.schema";
import { ZodIssue } from "zod";
import { redirect } from "next/navigation";
import { authOptions } from "@lib/auth";
import { getServerSession } from 'next-auth';

export default async function createEvent(_prevState: any, params: FormData) {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) {
        redirect('/');
    }
    const validation = eventSchema.safeParse({
        adult: params.get('adult') ? true : false,
        description: params.get('description') as string,
        endDate: params.get('endDate'),
        linkTicketing: params.get('linkTicketing')?.toString(),
        startDate: params.get('startDate'),
        publishedAt: params.get('publishedAt') ?? undefined,
        title: params.get('title')?.toString(),
        localization: {
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
        return {
            errors: validation.error.issues as ZodIssue[]
        };
    }

    await create(validation.data as unknown as Event);

    redirect('/event/userEvent');
}
