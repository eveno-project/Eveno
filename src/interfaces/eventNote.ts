import { Event } from "./event";
import { User } from "./user";

export interface EventNote {
    id: number;
    value: number;
    event?: Event;
    user?: User;
};