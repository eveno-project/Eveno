import { EventTag } from "../event/event-tag";
import { TagFollow } from "./tag-follow";

export interface Tag {
    id: number;
    name: string;
    eventTags: EventTag[];
    tagFollows: TagFollow[];
};