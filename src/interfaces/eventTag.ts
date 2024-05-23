import { Event } from "./event";
import { Tag } from "./tag";

export interface EventTag {
    id: number;
    event?: Event;
    tag?: Tag;
};