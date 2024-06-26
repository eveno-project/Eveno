import Card from "@components/event/card/card";
import Event from "@interfaces/event";

import style from './list.module.css';

export default function List({ events }: { events: Partial<Event>[] }) {
    return (
            <article className={style.list__container}>
                {events.map(event => (
                        <Card key={event.id} event={event} />
                ))}
            </article>
    );
}