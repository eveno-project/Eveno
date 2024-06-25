import EventCard from "./event-card";
import Event from "@interfaces/event";

const EventList = ({ events }: { events: Event[] }) => {
    return (
        <div>
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}

export default EventList;
