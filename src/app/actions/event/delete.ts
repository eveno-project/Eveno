"use server";
import Event from "@interfaces/event";
import { deleteOne } from "@services/event";
import { eventSchema } from "@validators/event.schema";
import { ZodIssue } from "zod";
import { redirect } from "next/navigation";
import { authOptions } from "@lib/auth";
import { getServerSession } from 'next-auth';

export default async function deleteEvent(_prevState: any, params: FormData) {

    if (params.get('id')) {
        await deleteOne(parseInt(params.get('id')));

    }

    redirect('/event/userEvent');
}