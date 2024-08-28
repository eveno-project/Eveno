import { Container } from "@mui/material";
import { authOptions } from "@lib/auth";
import { getServerSession } from 'next-auth';
import EventDetail from "@components/event/event-detail";
import { getById } from "@services/event";

export default async function Page({ params }: { params: { id: number } }) {
    const session = await getServerSession(authOptions);
    const event = await getById(params.id);
    return (
        <Container component="main" sx={{position: 'relative', overflow: 'hidden'}} maxWidth="md">
            {
                event && (
                    <EventDetail session={session} event={event} />
                )
            }
        </Container>
    );
}
