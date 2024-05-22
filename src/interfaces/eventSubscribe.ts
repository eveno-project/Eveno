import { Event } from "./event";
import { User } from "./user";

export type EventSubscribe = {
    id: number;
    userId: number;
    eventId: number;
    type: string;
    user?: User;
    event?: Event;
};