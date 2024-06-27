import Card from "@components/event/card/card";
import Event from "@interfaces/event";
import { getAll } from "@services/event";
import NavBar from "@components/navbar/navbar";

export default async function Home() {
  const events = await getAll();
  return (
    <main>
      {
        events.map(event => <Card event={event} />)
      }
    </main>
  );
}
