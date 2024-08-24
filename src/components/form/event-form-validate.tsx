"use client";
import Button from "@components/button/button";
import Event from "@interfaces/event";
import Tag from "@interfaces/tag";
import type { FormProps } from "@types/form-props";
import { useFormState } from "react-dom";

export default function EventFormValidate({ action, event }: { action: FormProps, event: Event }) {
    const [formState, formAction] = useFormState(action, { errors: [] },);

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={event.id} />
            <Button color="primary" type="submit">Valider l'event</Button>
        </form>
    );
};
