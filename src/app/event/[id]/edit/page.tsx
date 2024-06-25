import updateEvent from "@actions/event/update";
import EventForm from "@components/form/event-form";
import { getById } from "@services/event";
import { getAll } from "@services/tag";

export default async function Page({ params }: { params: { id: number } }) {
    const event = await getById((params.id));
    const updateEventWithId = updateEvent.bind(null, +params.id);
    const tags = await getAll();

    return (
        <EventForm action={updateEventWithId} event={event} tags={tags} />
    );
};