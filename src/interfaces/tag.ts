import { EventTag } from "./eventTag";
import { TagFollow } from "./tagFollow";

export interface Tag {
    id: number;
    name: string;
    eventTags: EventTag[];
    tagFollows: TagFollow[];
};