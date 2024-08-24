"use client";
import Button from "@components/button/button";
import Event from "@interfaces/event";
import Tag from "@interfaces/tag";
import type { FormProps } from "@types/form-props";
import { useFormState } from "react-dom";
import style from "./event.module.css"

export default function EventFormComment({ action, event }: { action: FormProps, event: Event }) {
    const [formState, formAction] = useFormState(action, { errors: [] },);

    return (
        <form action={formAction} className={style.form__container}>
            <input type="hidden" name="id" value={event.id} />
            <input
                name="comment"
                className={style.navbar__searchbar}
                placeholder="Commenter"
            />
            <Button color="primary" type="submit">Commenter</Button>
        </form>
    );
};
