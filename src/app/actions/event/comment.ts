"use server";
import { createComment } from "@services/event";
import { redirect } from "next/navigation";
import { authOptions } from "@lib/auth";
import { getServerSession } from 'next-auth';

export default async function commentEvent(_prevState: any, params: FormData) {
    const idEvent = params.get('id')?.toString();
    const commentContent = params.get('comment')?.toString();
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) {
        redirect('/');
    }

    if (idEvent && userId && commentContent) {
        createComment(+idEvent, userId, commentContent);
    }
    redirect('/event/' + idEvent);
}