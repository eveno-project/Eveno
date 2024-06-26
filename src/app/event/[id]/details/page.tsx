import { getById } from "@services/event";

export default async function Page({ params }: { params: { id: number } }) {
    const event = await getById(params.id);

    if (!event) {
        return (
            <h1>No event found</h1>
        );
    }

    const formatDate = (date: string | number | Date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }).format(new Date(date));
    };

    return (
        <div>
            <h1>{event.title}</h1>
            <h2>Description :</h2>
            <p>{event.description}</p>

            <h2>Dates :</h2>
            <p>Début : {formatDate(event.startDate)}</p>
            <p>Fin : {event.endDate ? formatDate(event.endDate) : 'Non spécifiée'}</p>

            {event.localizations && (
                <div>
                    <h2>Localisation :</h2>
                    <div key={event.localizations[0].id}>
                        <p>Adresse : {event.localizations[0].address}</p>
                        <p>Ville : {event.localizations[0].city}</p>
                        <p>Code postal : {event.localizations[0].zipCode}</p>
                        <p>Région : {event.localizations[0].regionName}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
