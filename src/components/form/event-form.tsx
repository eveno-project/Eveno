"use client";
import Button from "@components/button/button";
import Event from "@interfaces/event";
import { useFormState } from "react-dom";
import { ZodIssue } from "zod";
import { Action } from "@type/action";

export default function EventForm({ action, event, tags }: { action: Action, event?: Event, tags: Tag[] }) {
    const [formState, formAction] = useFormState(action, { errors: [] });
    const defaultDate = new Date().toISOString().split('T')[0];

    const startDate = event?.startDate ? new Date(event.startDate).toISOString().split('T')[0] : defaultDate;
    const endDate = event?.endDate ? new Date(event.endDate).toISOString().split('T')[0] : defaultDate;

    return (
        <form action={formAction}>
            {event?.id && (
                <input type="hidden" name="id" value={event.id} />
            )}
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
                    <input name="startDate" type="date" min={defaultDate} defaultValue={startDate} required />
                </div>
                <div>
                    <label htmlFor="endDate">Date de fin:</label>
                    <input name="endDate" type="date" min={defaultDate} defaultValue={endDate} required />
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
            {event?.localizations && (
                <input type="hidden" name="idLocalization" value={event.localizations[0].id} />
            )}
            <div>
                <label htmlFor="address">Adresse :</label>
                <input name="address" type="text" defaultValue={event?.localizations[0].address} />
            </div>
            <div>
                <label htmlFor="city">Ville :</label>
                <input name="city" type="text" defaultValue={event?.localizations[0].city} />
            </div>
            <div>
                <label htmlFor="zipCode">Code postal :</label>
                <input name="zipCode" type="number" pattern="^\d{5}$" defaultValue={event?.localizations[0].zipCode} />
            </div>
            <div>
                <label htmlFor="regionName">Region :</label>
                <input name="regionName" type="text" defaultValue={event?.localizations[0].regionName} />
            </div>
            <div>
                <label htmlFor="tags">Tags :</label>
                <select name="tags" multiple>
                    {tags.map(tag => (
                        <option key={tag.id} value={tag.id} selected={event?.tags.some(eventTag => eventTag.id === tag.id)}>
                            {tag.name}
                        </option>
                    ))}
                </select>
            </div>

            <Button color="primary" type="submit">{event?.id ? "Modifier l'évènement" : "Créer un évènement"}</Button>
        </form>
    );
}
