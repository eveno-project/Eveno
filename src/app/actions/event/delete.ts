"use server";
import { deleteOne } from "@services/event";
import { redirect } from "next/navigation";
import { authOptions } from "@lib/auth";
import { getServerSession } from "next-auth";

export default async function deleteEvent(_prevState: any, params: FormData) {
    const id = params.get('id')?.toString();
    const session = await getServerSession(authOptions);
    if (id && session?.user) {
        await deleteOne(+id, session.user.id);
    }
    redirect('/event/userEvent');
}