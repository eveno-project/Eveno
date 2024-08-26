import { NextResponse } from "next/server";
import { deleteOne, getById, update } from "@services/event";
import { authOptions } from "@lib/auth";
import { updateEventSchema } from '@validators/event.schema';
import { getServerSession } from "next-auth";
import { ZodIssue } from 'zod';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const parsedId = parseInt(params.id);
    const session = await getServerSession(authOptions);

    try {
        if (session && session.user) {
            const success = await deleteOne(parsedId, session.user.id);

            if (success) {
                // Return success response
                return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
            } else {
                // Return failure response if deletion was unsuccessful
                return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
            }
        } else {
            // Return unauthorized response if user is not authenticated
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    } catch (error) {
        // Return error response
        return NextResponse.json({ error: "An error occurred while deleting the event" }, { status: 500 });
    }
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {
        const parsedId = parseInt(params.id);
        const event = await getById(parsedId);
        return NextResponse.json({ data: event }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while fetching the event" }, { status: 500 });
    }
}





export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    const id = parseInt(params.id);
    const userId = session?.user.id;

    if (!userId) {
        return NextResponse.redirect('/');
    }

    const formData = await req.formData();
    console.log(formData);
    const validation = updateEventSchema.safeParse({
        id: +id,
        adult: formData.get('adult') === 'on',
        description: formData.get('description')?.toString(),
        endDate: formData.get('endDate')?.toString(),
        linkTicketing: formData.get('linkTicketing')?.toString(),
        startDate: formData.get('startDate')?.toString(),
        publishedAt: formData.get('publishedAt')?.toString() ?? undefined,
        title: formData.get('title')?.toString(),
        localizations: {
            id: +formData.get('idLocalization')!.toString(),
            address: formData.get('address')?.toString(),
            city: formData.get('city')?.toString(),
            regionName: formData.get('regionName')?.toString(),
            zipCode: formData.get('zipCode')?.toString(),
            longitude: 0,
            latitude: 0,
        },
        tags: formData.getAll('tags').map(tag => ({ id: Number(tag) })),
        user: {
            id: userId
        }
    });

    if (!validation.success) {
        console.error({ error: validation.error.issues });
        return NextResponse.json({ errors: validation.error.issues[0].path }, { status: 400 });
    }

    await update(validation.data);

    return NextResponse.redirect(new URL('/event/userEvent', req.url));
}