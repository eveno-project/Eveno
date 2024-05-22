import { Event } from "./event";
import { User } from "./user";

export type Comment = {
    id: number;
    eventId: number;
    userId: number;
    content: string;
    parentId?: number;
    event?: Event;
    user?: User;
    replies?: Comment[];
    parent?: Comment;
};