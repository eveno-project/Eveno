import Card from "@components/event/card/card";
import Event from "@interfaces/event";

export default function Home() {
  const events = [
    {
      title: 'Évènement de l\'année dernière',
      images: [
        {
          path: 'https://placehold.co/600x400',
          name: 'placehold 600x400'
        }
      ],
      notes: [{
        id: 1,
        value: 3
      }]
    },
    {
      title: 'Évènement de l\'année dernière',
      images: [
        {
          path: 'https://placehold.co/600x400',
          name: 'placehold 600x400'
        }
      ],
    },{
      title: 'Évènement de l\'année dernière',
      images: [
        {
          path: 'https://placehold.co/600x400',
          name: 'placehold 600x400'
        }
      ],
    },{
      title: 'Évènement de l\'année dernière',
      images: [
        {
          path: 'https://placehold.co/600x400',
          name: 'placehold 600x400'
        }
      ],
    },{
      title: 'Évènement de l\'année dernière',
      images: [
        {
          path: 'https://placehold.co/600x400',
          name: 'placehold 600x400'
        }
      ],
    },{
      title: 'Évènement de l\'année dernière',
      images: [
        {
          path: 'https://placehold.co/600x400',
          name: 'placehold 600x400'
        }
      ],
    },{
      title: 'Évènement de l\'année dernière',
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
        events.map(event => <Card event={event}/>)
      }
    </main>
  );
}
