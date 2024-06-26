"use client";

import Button from "@components/button/button";
import TagComponent from "@components/tag/tag";
import Tag from "@interfaces/tag";
import type { FormProps } from "@types/form-props";
import { useFormState } from "react-dom";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import style from './tag-form.module.css';
import { useRef, useState } from "react";

export default function TagForm({ action, tag }: { action: FormProps, tag?: Tag }) {
    const [formState, formAction] = useFormState(action, { errors: [] });
    const formRef = useRef<HTMLFormElement>(null);
    const [value, changeValue] = useState('');




    return (
        <form action={formAction} className={style.form} >
            {
                tag?.id ? (
                    <TagComponent color="primary" className={style.button}>
                        <input type="hidden" name="id" value={tag.id} />
                        <div>{tag?.name}</div>
                        <button className={style.delete} ><ClearRoundedIcon /></button>
                    </TagComponent>
                ) : (
                    <div>
                        <input name="name" type="text" required />
                        <Button >Créer un tag</Button>
                    </div>
                )
            }

        </form >
    );
};
