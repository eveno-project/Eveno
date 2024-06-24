"use client";

import Button from "@components/button/button";
import Event from "@interfaces/event";
import type { FormProps } from "@types/form-props";
import { useFormState } from "react-dom";

export default function EventForm({ action, event }: { action: FormProps, event?: Event }) {
    const [formState, formAction] = useFormState(action, { errors: [] });
    const defaultDate = new Date().toISOString().split('T')[0];

    const startDate = event?.startDate ? new Date(event.startDate).toISOString().split('T')[0] : defaultDate;
    const endDate = event?.endDate ? new Date(event.endDate).toISOString().split('T')[0] : defaultDate;

    return (
        <form action={formAction}>
            {
                event?.id && (
                    <input type="hidden" name="id" value={event.id} />
                )
            }
            <div>
                <label htmlFor="title">Titre:</label>
                <input name="title" type="text" required defaultValue={event?.title} />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <textarea name="description" required defaultValue={event?.description} />
            </div>
            <div>
                <div>
                    <label htmlFor="startDate">Date de départ:</label>
                    <input name="startDate" type="date" min={defaultDate} defaultValue={defaultDate} required value={startDate} />
                </div>
                <div>
                    <label htmlFor="endDate">Date de fin:</label>
                    <input name="endDate" type="date" min={defaultDate} defaultValue={defaultDate} required value={endDate} />
                </div>
            </div>
            <div>
                <label htmlFor="linkTicketing">Lien billeterie :</label>
                <input name="linkTicketing" type="text" defaultValue={event?.linkTicketing} />
            </div>
            <div>
                <label htmlFor="adult">Tout public ?</label>
                <input name="adult" type="checkbox" defaultChecked={event?.adult} />
            </div>
            {
                event?.localization && (
                    <input type="hidden" name="idLocalization" value={event?.localization[0].id} />
                )
            }
            <div>
                <label htmlFor="address">Adresse :</label>
                <input name="address" type="text" defaultValue={event?.localization[0].address} />
            </div>
            <div>
                <label htmlFor="city">Ville :</label>
                <input name="city" type="text" defaultValue={event?.localization[0].city} />
            </div>
            <div>
                <label htmlFor="zipCode">Code postal :</label>
                <input name="zipCode" type="number" pattern="^\d{5}$" defaultValue={event?.localization[0].zipCode} />
            </div>
            <div>
                <label htmlFor="regionName">Region :</label>
                <input name="regionName" type="text" defaultValue={event?.localization[0].regionName} />
            </div>
            <Button color="primary" type="submit">{event?.id ? "Modifier l'évènement" : "Créer un évènement"}</Button>
        </form>
    );
};
