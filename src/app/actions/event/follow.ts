"use server";
import { follow, valid } from "@services/event";
import { redirect } from "next/navigation";
import { authOptions } from "@lib/auth";
import { getServerSession } from 'next-auth';

export default async function followEvent(_prevState: any, params: FormData) {
    const idEvent = params.get('id')?.toString();
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) {
        redirect('/');
    }

    if (idEvent) {
        await follow(+idEvent, userId);
    }
    redirect('/');
}