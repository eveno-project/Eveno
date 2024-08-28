import { NextResponse } from "next/server";
import { deleteOne, getById, update } from "@services/event";
import { authOptions } from "@lib/auth";
import { updateEventSchema } from '@validators/event.schema';
import { getServerSession } from "next-auth";
import { ZodIssue } from 'zod';
import { Role } from "@constants/role";

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const parsedId = parseInt(params.id);
    const session = await getServerSession(authOptions);

    try {
        if (session && session.user) {
            // verify that the user is the owner of the event
            const event = await getById(parsedId);

            if (event.user.id !== session.user.id) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

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
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (session.user.role !== Role.ADMIN) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const parsedId = parseInt(params.id);
        const event = await getById(parsedId);
        return NextResponse.json({ data: event }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while fetching the event" }, { status: 500 });
    }
}




export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) {
        return NextResponse.redirect('/');
    }

    try {
        const data = await req.json();

        data.id = parseInt(params.id);

        const { localizations } = data;

        if (
            localizations &&
            (
                (localizations.address && localizations.address.trim() !== '') ||
                (localizations.city && localizations.city.trim() !== '') ||
                (localizations.regionName && localizations.regionName.trim() !== '') ||
                (localizations.zipCode && (localizations.zipCode !== 0 && localizations.zipCode !== ''))
            )
        ) {
            const { address, city, regionName, zipCode, latitude, longitude } = localizations;
            data.localizations = {
                address: address || '',
                city: city || '',
                regionName: regionName || '',
                zipCode: parseInt(zipCode) || 0,
                latitude: latitude || 0,
                longitude: longitude || 0
            };
        } else {
            delete data.localizations;
        }

        const event = await update(data);
        return NextResponse.json({ success: event });

    } catch (error) {
        console.error('Erreur lors du traitement de la requête :', error);
        return NextResponse.json({ error: 'Erreur lors du traitement des données.' }, { status: 500 });
    }
}
