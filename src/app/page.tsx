import Card from "@components/event/card/card";
import Event from "@interfaces/event";
import { getAll } from "@services/event";

export default async function Home() {
  const events = await getAll() as Partial<Event>[];
  return (
    <main>
      {
        events.map(event => <Card event={event} />)
      }
    </main>
  );
}
