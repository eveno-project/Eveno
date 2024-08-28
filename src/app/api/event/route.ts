import { NextResponse } from 'next/server';
import { create, getAll, update } from '@services/event';
import { eventSchema, updateEventSchema } from '@validators/event.schema';
import { ZodIssue } from 'zod';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';


export async function GET() {
    try {
        const events = await getAll();
        return NextResponse.json({ data: events }, { status: 200 });
    } catch (error) {
        console.error({ error });
        throw NextResponse.json({ error }, { status: 500 });
    }
}


export async function POST(req: Request) {
    // Récupérer la session utilisateur
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    // Vérifier si l'utilisateur est authentifié
    if (!userId) {
        return NextResponse.redirect('/');
    }

    try {
        const data = await req.json();

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

        const { adult, ...result } = data;

        const event = await create({...result, adult: !adult });

        return NextResponse.json({ success: event });

    } catch (error) {
        console.error('Erreur lors du traitement de la requête :', error);
        return NextResponse.json({ error: 'Erreur lors du traitement des données.' }, { status: 500 });
    }
}


