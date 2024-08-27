"use client";
import Event from "@interfaces/event";
import { Button, TextField } from "@mui/material";
import Tag from "@interfaces/tag";
import type { FormProps } from "@types/form-props";
import { useFormState } from "react-dom";
import style from "./event.module.css"

export default function EventFormComment({ action, event }: { action: FormProps, event: Event }) {
    const [formState, formAction] = useFormState(action, { errors: [] });

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
