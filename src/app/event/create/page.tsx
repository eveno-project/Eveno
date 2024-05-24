import createEvent from "../../actions/event/create";
import EventForm from "@components/Form/event-form";

export default async function EventCreate() {
    return (
        <EventForm action={createEvent} />
    );
};
