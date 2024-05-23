import { Event } from "./event/event";
import { User } from "./user";

export interface Comment {
    id: number;
    content: string;
    event: Event;
    user: User;
    parent?: Comment;
    replies: Comment[];
};