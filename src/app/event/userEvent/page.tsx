import EventList from "@components/event/event-list";
import { getByUserEmail } from "@services/event";

export default async function Page() {
    const events = await getByUserEmail('user1@gmail.com');
    console.log(events);
    return (
        <div>
            <EventList events={events} />
        </div>
    );
}
