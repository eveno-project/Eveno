import { Event } from "./event";
import { User } from "./user";

export interface EventSubscribe {
    id: number;
    type: string;
    user?: User;
    event?: Event;
};