import EventList from "@components/event/event-list";
import { getAll } from "@services/event";


export default async function Page({ params }: { params: { id: number } }) {
    const events = await getAll();
    return (
        <div>
            <EventList events={events} />
        </div>

    );


};