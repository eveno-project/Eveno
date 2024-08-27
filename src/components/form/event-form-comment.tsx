"use client";
import Event from "@interfaces/event";
import { Box, Button, TextField } from "@mui/material";

export default function EventFormComment({ event }: { event: Event }) {
    return (
        <Box component="form" action="/api/comment" method="POST">
            <TextField type="hidden" name="id" value={event.id} />
            <TextField
                name="comment"
                placeholder="Commenter"
            />
            <Button color="primary" type="submit">Commenter</Button>
        </Box>
    );
}
