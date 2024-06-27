"use server";
import { deleteOne } from "@services/event";
import { redirect } from "next/navigation";

export default async function deleteEvent(_prevState: any, params: FormData) {
    const id = params.get('id')?.toString();
    if (id) {
        await deleteOne(+id);
    }
    redirect('/event/userEvent');
}