import createEvent from "@actions/event/create";
import EventForm from "@components/form/event-form";
import { getAll } from "@services/tag";

export default async function EventCreate() {
    const tags = await getAll();

    return (
        <EventForm action={createEvent} tags={tags} />
    );
};
