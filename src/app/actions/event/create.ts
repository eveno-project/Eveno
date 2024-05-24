"use server";
import Event from "@interfaces/event";
import create from "@services/event";
import { eventShema } from "@validators/event.schema";
import { ZodIssue, ZodObject } from "zod";

export default async function createEvent(_prevState: any, params: FormData) {
    const validation = eventShema.safeParse({
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
        }
    });

    if (!validation.success) {
        console.error({
            address: params.get('address'),
            issues: validation.error.issues
        });
        return {
            errors: validation.error.issues as ZodIssue[]
        };
    }

    await create(validation.data as Event);

    // redirect('/');
}