import EventList from "@components/event/event-list";
import { getByTagName } from "@services/event";


export default async function Page({ params }: { params: { tag: string } }) {
    const events = await getByTagName(params.tag);
    return (
        <div>
            <EventList events={events} />
        </div>

    );


};