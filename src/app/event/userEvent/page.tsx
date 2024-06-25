import EventCard from "@components/event/event-card";
import { getByUserEmail } from "@services/event";

export default async function Page() {
    const events = await getByUserEmail('user1@gmail.com');
    return (
        <div>
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}

        </div>

    );


};