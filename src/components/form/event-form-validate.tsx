"use client";
import Event from "@interfaces/event";
import style from "./event.module.css";
import { Box, Button, TextField } from "@mui/material";

export default function EventFormValidate({ event }: { event: Event }) {
    return (
        <Box component="form" action="/api/admin/event/validate" method="POST" className={style.form__container}>
            <TextField type="hidden" name="id" value={event.id} />
            <Button color="primary" type="submit">Valider l&apos;event</Button>
        </Box>
    );
};
