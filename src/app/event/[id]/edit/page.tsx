import updateEvent from "@actions/event/update";
import EventForm from "@components/form/event-form";
import { getById } from "@services/event";
import { getAll } from "@services/tag";
import { authOptions } from "@lib/auth";
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: number } }) {
    const event = await getById((params.id));
    const updateEventWithId = updateEvent.bind(null, +params.id);
    const tags = await getAll();
    const session = await getServerSession(authOptions);

    if (event?.user.id != session?.user.id) {
        redirect("/");
    }

    return (
        <EventForm action={updateEventWithId} event={event} tags={tags} />
    );
};