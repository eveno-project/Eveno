import { getAll } from "@services/event";
import EventCard from "@components/event/event-card";

export default async function Page({ params }: { params: { id: number } }) {
    const events = await getAll();
    return (
        <div>
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}

        </div>

    );


};