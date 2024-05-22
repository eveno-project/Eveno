import { Event } from "./event";
import { User } from "./user";

export type EventNote = {
    id: number;
    eventId: number;
    userId: number;
    value: number;
    event?: Event;
    user?: User;
};