import { NextResponse } from 'next/server';
import { follow, unFollow } from "@services/event";
import { getServerSession } from 'next-auth';
import { authOptions } from "@lib/auth";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    const formData = await req.formData();
    const userId = session.user.id;
    const idEvent = formData.get('id')?.toString();
    const followBoolean = formData.get('boolean')?.toString();

    if (!userId) {
        NextResponse.redirect("/");
    }

    if (idEvent) {
        if (followBoolean == 'false') {
            await follow(+idEvent, userId);
        } else if (followBoolean == 'true') {
            await unFollow(+idEvent, userId);
        }
    }

    const redirectUrl = new URL(`/event/${idEvent}`, req.url);
    return NextResponse.redirect(redirectUrl);
}
