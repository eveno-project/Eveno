import List from "@components/event/list/list";
import { Container } from "@mui/material";
import { getAll } from "@services/event";
import style from './page.module.css';

export default async function Page() {
    const events = await getAll();
    return (
        <Container className={style.container} maxWidth="md">
            <List events={events} />
        </Container>
    );
};