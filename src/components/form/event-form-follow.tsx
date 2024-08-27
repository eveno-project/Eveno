"use client";
import { Button } from "@mui/material";
import Event from "@interfaces/event";

export default function EventFormFollow({ event, doYouFollow }: { event: Event, doYouFollow: boolean }) {

    if (doYouFollow == false) {
        return (
            <form action="/api/event/follow" method="POST">
                <input type="hidden" name="id" value={event.id} />
                <input type="hidden" name="boolean" value={doYouFollow.toString()} />
                <Button color="primary" type="submit">Suivre L&apos;évènement</Button>
            </form>
        );
    } else if (doYouFollow == true) {
        return (
            <form action="/api/event/follow" method="POST">
                <input type="hidden" name="id" value={event.id} />
                <input type="hidden" name="boolean" value={doYouFollow.toString()} />
                <Button color="primary" type="submit">Ne plus suivre L&apos;évènement</Button>
            </form>
        );
    }

};
