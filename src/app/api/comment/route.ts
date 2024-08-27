import { NextResponse } from 'next/server';
import { createComment } from "@services/event";
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
    const commentContent = formData.get('comment')?.toString();

    if (idEvent && userId && commentContent) {
        await createComment(+idEvent, userId, commentContent);
    }

    const redirectUrl = new URL(`/event/${idEvent}`, req.url);
    return NextResponse.redirect(redirectUrl);
}
