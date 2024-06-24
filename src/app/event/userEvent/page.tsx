import EventCard from "@components/event/event-card";
import { getByUserId } from "@services/event";

export default async function Page({ params }: { params: { id: number } }) {
    const events = await getByUserId('3');
    return (
        <div>
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}

        </div>

    );


};