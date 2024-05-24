"use client";

import Button from "@components/button/button";
import type { FormProps } from "@types/form-props";
import { useFormState } from "react-dom";

export default function EventForm({ action }: { action: FormProps }) {
    const [formState, formAction] = useFormState(action, { errors: [] });
    const defaultDate = new Date().toISOString().split('T')[0];
    return (
        <form action={formAction}>
            <div>
                <label htmlFor="title">Titre:</label>
                <input name="title" type="text" required />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea name="description" required />
            </div>
            <div>
                <div>
                    <label htmlFor="startDate">Date de départ:</label>
                    <input name="startDate" type="date" min={defaultDate} defaultValue={defaultDate} required />
                </div>
                <div>
                    <label htmlFor="endDate">Date de fin:</label>
                    <input name="endDate" type="date" min={defaultDate} defaultValue={defaultDate} required />
                </div>
            </div>
            <div>
                <label htmlFor="linkTicketing">Lien billeterie :</label>
                <input name="linkTicketing" type="text" />
            </div>
            <div>
                <label htmlFor="adult">Tout public ?</label>
                <input name="adult" type="checkbox" />
            </div>
            <div>
                <label htmlFor="address">Adresse :</label>
                <input name="address" type="text" />
            </div>
            <div>
                <label htmlFor="city">Ville :</label>
                <input name="city" type="text" />
            </div>
            <div>
                <label htmlFor="zipCode">Code postal :</label>
                <input name="zipCode" type="number" pattern="^\d{5}$" />
            </div>
            <div>
                <label htmlFor="regionName">Region :</label>
                <input name="regionName" type="text" />
            </div>
            <Button color="primary" type="submit">Créer un évènement</Button>
        </form>
    );
};
