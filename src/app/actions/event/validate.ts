"use server";
import { valid } from "@services/event";
import { redirect } from "next/navigation";

export default async function validateEvent(_prevState: any, params: FormData) {
    const id = params.get('id')?.toString();
    if (id) {
        await valid(+id);
    }
    redirect('/admin/event');
}