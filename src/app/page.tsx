import EventCard from "@components/event/event-card";
import Event from "@interfaces/event";

export default function Home() {
  const events = [
    {
      title: 'Évènement de l’année dernière',
      images: [
        {
          path: 'https://placehold.co/600x400',
          name: 'placehold 600x400'
        }
      ],
    },
    {
      title: 'Évènement de l’année dernière',
      images: [
        {
          path: 'https://placehold.co/600x400',
          name: 'placehold 600x400'
        }
      ],
    },{
      title: 'Évènement de l’année dernière',
      images: [
        {
          path: 'https://placehold.co/600x400',
          name: 'placehold 600x400'
        }
      ],
    },{
      title: 'Évènement de l’année dernière',
      images: [
        {
          path: 'https://placehold.co/600x400',
          name: 'placehold 600x400'
        }
      ],
    },{
      title: 'Évènement de l’année dernière',
      images: [
        {
          path: 'https://placehold.co/600x400',
          name: 'placehold 600x400'
        }
      ],
    },{
      title: 'Évènement de l’année dernière',
      images: [
        {
          path: 'https://placehold.co/600x400',
          name: 'placehold 600x400'
        }
      ],
    },{
      title: 'Évènement de l’année dernière',
      images: [
        {
          path: 'https://placehold.co/600x400',
          name: 'placehold 600x400'
        }
      ],
    },
  ] as Partial<Event>[];
  return (
    <main>
      {
        events.map(event => <EventCard event={event}/>)
      }
    </main>
  );
}
