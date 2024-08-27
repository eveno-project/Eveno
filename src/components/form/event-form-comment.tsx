"use client";
import Event from "@interfaces/event";
import { Box, Button, TextField } from "@mui/material";

export default function EventFormComment({ event }: { event: Event }) {
    return (
        <Box component="form" action="/api/comment" method="POST" sx={{
            display: 'flex',
            gap: 1,
            paddingX: 1
        }}>
            <input type="hidden" name="id" value={event.id} />
            <TextField
                fullWidth
                name="comment"
                placeholder="Commenter"
            />
            <Button variant="outlined"  type="submit">Commenter</Button>
        </Box>
    );
}
