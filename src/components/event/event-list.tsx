import EventCard from "@components/event/card/card";
import Event from "@interfaces/event";
import { Box } from "@mui/material";

export default function EventList({ events }: { events: Partial<Event>[] }) {
    return (
        <Box component="section">
            {events.map((event, index) => (
                <EventCard key={index} event={event} index={index}/>
            ))}
        </Box>
    );
}
