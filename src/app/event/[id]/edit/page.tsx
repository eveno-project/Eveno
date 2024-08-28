import updateEvent from "@actions/event/update";
import EventForm from "@components/form/event-form";
import EventFormDelete from "@components/form/event-form-delete";
import { getById } from "@services/event";
import { getAll } from "@services/tag";
import { authOptions } from "@lib/auth";
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import { Container } from "@mui/material";

export default async function Page({ params }: { params: { id: number } }) {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect("/");
    }
    const event = await getById((params.id));
    const updateEventWithId = updateEvent.bind(null, +params.id);
    const tags = await getAll();

    if (!event || event?.user.id != session?.user.id) {
        redirect("/");
    }
    return (
        <Container component="main" maxWidth="md">
            <EventForm event={event} tags={tags} userId={session.user.id} />
            <EventFormDelete event={event} />
        </Container>
    );
};