"use client";
import { Box, Button, TextField } from "@mui/material";
import Event from "@interfaces/event";

export default function EventFormFollow({ event, doYouFollow }: { event: Event, doYouFollow: boolean }) {

    if (doYouFollow == false) {
        return (
            <Box component="form" action="/api/event/follow" method="POST">
                <TextField type="hidden" name="id" value={event.id} />
                <TextField type="hidden" name="boolean" value={doYouFollow.toString()} />
                <Button color="primary" type="submit">Suivre L&apos;évènement</Button>
            </Box>
        );
    } else if (doYouFollow == true) {
        return (
            <Box component="form" action="/api/event/follow" method="POST">
                <TextField type="hidden" name="id" value={event.id} />
                <TextField type="hidden" name="boolean" value={doYouFollow.toString()} />
                <Button color="primary" type="submit">Ne plus suivre L&apos;évènement</Button>
            </Box>
        );
    }

};
