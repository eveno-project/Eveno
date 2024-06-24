"use server";
import Event from "@interfaces/event";
import { update } from "@services/event";
import { updateEventSchema } from "@validators/event.schema";
import { redirect } from "next/navigation";
import { ZodIssue } from "zod";

export default async function updateEvent(id: number, _prevState?: any, params?: FormData) {
    if (!params) {
        throw Error('aucun paramètre');
    }
    // console.debug({ address: params.get('address') });
    const validation = updateEventSchema.safeParse({
        id: id,
        adult: params.get('adult') ? true : false,
        description: params.get('description') as string,
        endDate: params.get('endDate'),
        linkTicketing: params.get('linkTicketing')?.toString(),
        startDate: params.get('startDate'),
        publishedAt: params.get('publishedAt') ?? undefined,
        title: params.get('title')?.toString(),
        localization: {
            id: +params.get('idLocalization')!.toString(),
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
            issues: validation.error.issues
        });
        return {
            errors: validation.error.issues as ZodIssue[]
        };
    }

    await update(validation.data as unknown as Event);

    redirect('/event/' + id + '/details/');
}
