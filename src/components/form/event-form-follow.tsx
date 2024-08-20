"use client";
import Button from "@components/button/button";
import Event from "@interfaces/event";
import Tag from "@interfaces/tag";
import type { FormProps } from "@types/form-props";
import { useFormState } from "react-dom";

export default function EventFormFollow({ action, event, doYouFollow }: { action: FormProps, event: Event, doYouFollow: boolean }) {
    const [formState, formAction] = useFormState(action, { errors: [] },);

    if (doYouFollow == false) {
        return (
            <form action={formAction}>
                <input type="hidden" name="id" value={event.id} />
                <input type="hidden" name="boolean" value={doYouFollow.toString()} />
                <Button color="primary" type="submit">Suivre L'évènement</Button>
            </form>
        );
    } else if (doYouFollow == true) {
        return (
            <form action={formAction}>
                <input type="hidden" name="id" value={event.id} />
                <input type="hidden" name="boolean" value={doYouFollow.toString()} />
                <Button color="primary" type="submit">Ne plus suivre L'évènement</Button>
            </form>
        );
    }

};
