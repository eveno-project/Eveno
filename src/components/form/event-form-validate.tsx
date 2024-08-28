"use client";
import Event from "@interfaces/event";
import style from "./event.module.css";
import { Box, Button, TextField } from "@mui/material";
import { Check } from "@mui/icons-material";

export default function EventFormValidate({ event }: { event: Event }) {
    return (
        <Box component="form" action="/api/admin/event/validate" method="POST" className={style.form__container}>
            <input type="hidden" name="id" value={event.id} />
            <Button variant="contained" color="success" type="submit" endIcon={<Check />}>Valider l&apos;event</Button>
        </Box>
    );
};
