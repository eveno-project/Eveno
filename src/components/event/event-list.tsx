import EventCard from "@components/event/card/card";
import Event from "@interfaces/event";

const EventList = ({ events }: { events: Partial<Event>[] }) => {
    return (
        <div>
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}

export default EventList;
