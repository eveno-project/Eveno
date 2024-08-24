import createEvent from "@actions/event/create";
import EventForm from "@components/form/event-form";
import { getAll } from "@services/tag";
import { authOptions } from "@lib/auth";
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import { Container } from "@mui/material";

export default async function EventCreate() {
    const tags = await getAll();
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/");
    }

    return (
        <Container component="main" maxWidth="md">
            <EventForm action={createEvent} tags={tags} />
        </Container>
    );
};
