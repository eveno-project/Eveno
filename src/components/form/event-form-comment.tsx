"use client";
import Event from "@interfaces/event";
import { Button, TextField } from "@mui/material";

export default function EventFormComment({ event }: { event: Event }) {
    return (
        <form action="/api/comment" method="POST">
            <input type="hidden" name="id" value={event.id} />
            <TextField
                name="comment"
                placeholder="Commenter"
            />
            <Button color="primary" type="submit">Commenter</Button>
        </form>
    );
}
