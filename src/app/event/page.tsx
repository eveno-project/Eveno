import List from "@components/event/list/list";
import { Container } from "@mui/material";
import { getAll } from "@services/event";

export default async function Page() {
    const events = await getAll();
    return (
        <Container
            component="main"
            maxWidth="md"
            sx={{
                overflow: 'hidden'
            }}
        >
            <List events={events.events} />
        </Container>
    );
};