import { NextResponse } from 'next/server';
import { valid } from "@services/event";
import { getServerSession } from 'next-auth';
import { authOptions } from "@lib/auth";
import { Role } from '@constants/role';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const formData = await req.formData();
    const userRole = session.user.role;
    const idEvent = formData.get('id')?.toString();

    if (idEvent && userRole == Role.ADMIN) {
        await valid(+idEvent);
    }

    const redirectUrl = new URL(`/event/${idEvent}`, req.url);
    return NextResponse.redirect(redirectUrl);
}
