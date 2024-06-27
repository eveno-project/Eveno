"use client";

import Button from "@components/button/button";
import TagComponent from "@components/tag/tag";
import Tag from "@interfaces/tag";
import type { FormProps } from "@type/form-props";
import { useFormState } from "react-dom";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import style from './tag-form.module.css';
import { useRef, useState } from "react";
import { Action } from "@type/action";

export default function TagForm({ action, tag }: { action: Action, tag?: Tag }) {
    const [formState, formAction] = useFormState(action, { errors: [] });
    const formRef = useRef<HTMLFormElement>(null);
    const [value, changeValue] = useState('');
    return (
        <form action={formAction} className={style.form} >
            {
                tag?.id ? (
                    <TagComponent color="primary" className={style.button}>
                        <input type="hidden" name="id" value={tag.id} />
                        <p>{tag?.name}</p>
                        <button className={style.delete}>
                            <ClearRoundedIcon />
                        </button>
                    </TagComponent>
                ) : (
                    <section>
                        <input name="name" type="text" required />
                        <Button color="primary" type="submit">Créer un tag</Button>
                    </section>
                )
            }
        </form>
    );
};
