import { Comment } from "./comment";
import { Event } from "./event/event";
import { EventNote } from "./event/event-note";
import { EventSubscribe } from "./event/event-subscribe";
import { Role } from "./role";
import { TagFollow } from "./tag/tag-follow";

export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    token: string;
    image?: string;
    adult: boolean;
    birthday: Date;
    role: Role;
    comments: Comment[];
    events: Event[];
    tagFollows: TagFollow[];
    eventSubscribes: EventSubscribe[];
    eventNotes: EventNote[];
};