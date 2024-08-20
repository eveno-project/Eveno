"use server";
import { follow, unFollow } from "@services/event";
import { redirect } from "next/navigation";
import { authOptions } from "@lib/auth";
import { getServerSession } from 'next-auth';
import { Console } from "console";

export default async function followEvent(_prevState: any, params: FormData) {
    const idEvent = params.get('id')?.toString();
    const followBoolean = params.get('boolean')?.toString();
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    if (!userId) {
        redirect('/');
    }
    console.log(idEvent, followBoolean);

    if (idEvent) {
        if (followBoolean == 'false') {
            await follow(+idEvent, userId);
        } else if (followBoolean == 'true') {
            await unFollow(+idEvent, userId);
        }
    }
    redirect('/event/' + idEvent);
}