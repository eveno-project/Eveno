import EventList from "@components/event/event-list";
import { Container } from "@mui/material";
import { getByTagName } from "@services/event";


export default async function Page({ params }: { params: { tag: string } }) {
    const events = await getByTagName(params.tag);
    return (
        <Container component="main" maxWidth="md">
            <EventList events={events} />
        </Container>
    );
}