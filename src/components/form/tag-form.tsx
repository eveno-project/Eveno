"use client";

import Button from "@components/button/button";
import Tag from "@interfaces/tag";
import type { FormProps } from "@types/form-props";
import { useFormState } from "react-dom";


export default function TagForm({ action, tag }: { action: FormProps, tag?: Tag }) {
    const [formState, formAction] = useFormState(action, { errors: [] });

    return (
        <form action={formAction}>
            {
                tag?.id && (
                    <input type="hidden" name="id" value={tag.id} />
                )
            }
            <input name="name" type="text" required defaultValue={tag?.name} />
            <Button color="primary" type="submit">{tag?.id ? "Modifier le tag" : "Créer un tag"}</Button>
        </form>
    );
};
