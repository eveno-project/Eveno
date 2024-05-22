import { Comment } from "./comment";
import { Event } from "./event";
import { EventNote } from "./eventNote";
import { EventSubscribe } from "./eventSubscribe";
import { Role } from "./role";
import { TagFollow } from "./tagFollow";

export type User = {
    id: number;
    username: string;
    password: string;
    email: string;
    token: string;
    image?: string;
    adult: boolean;
    birthday: Date;
    roleId: number;
    role?: Role;
    comments?: Comment[];
    events?: Event[];
    tagFollows?: TagFollow[];
    eventSubscribes?: EventSubscribe[];
    eventNotes?: EventNote[];
};