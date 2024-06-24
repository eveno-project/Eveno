import { getById } from "@services/event";

export default async function Page({ params }: { params: { id: number } }) {
    const event = await getById((params.id));
    if (event) {
        return (
            <div>
                <h1>{event.title}</h1>
                <h2>Description : </h2>
                <h3>{event.description}</h3>
                
            </div>

        );
    } else {
        return (
            <h1>No event found</h1>
        );
    }


};