"use client";
import Event from "@interfaces/event";
import style from "./event.module.css";
import { Button } from "@mui/material";

export default function EventFormValidate({ event }: { event: Event }) {
    return (
        <form action="/api/admin/event/validate" method="POST" className={style.form__container}>
            <input type="hidden" name="id" value={event.id} />
            <Button color="primary" type="submit">Valider l&apos;event</Button>
        </form>
    );
};
