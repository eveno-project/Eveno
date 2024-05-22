import { Event } from "./event";
import { Tag } from "./tag";

export type EventTag = {
    id: number;
    eventId: number;
    tagId: number;
    event?: Event;
    tag?: Tag;
};