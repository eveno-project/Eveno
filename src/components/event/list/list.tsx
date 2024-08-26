import Card from "@components/event/card/card";
import Event from "@interfaces/event";
import Grid from '@mui/material/Unstable_Grid2';

import { Box } from "@mui/material";

export default function List({ events }: { events: Partial<Event>[] }) {
    return (
        <Grid component="section" container spacing={1} sx={{ marginTop: 2}}>
            {events.map((event, index) => (
                <Grid key={event.id}>
                    <Card event={event} index={index}/>
                </Grid>
            ))}
        </Grid>
    );
}