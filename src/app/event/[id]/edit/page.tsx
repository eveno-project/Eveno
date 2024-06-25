import updateEvent from "@actions/event/update";
import EventForm from "@components/form/event-form";
import { getById } from "@services/event";

export default async function Page({ params }: { params: { id: number } }) {
    const event = await getById((params.id));
    const updateEventWithId = updateEvent.bind(null, +params.id);

    return (
        <EventForm action={updateEventWithId} event={event} />
    );
};