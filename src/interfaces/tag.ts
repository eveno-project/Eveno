import { EventTag } from "./eventTag";
import { TagFollow } from "./tagFollow";

export type Tag = {
    id: number;
    name: string;
    eventTags?: EventTag[];
    tagFollows?: TagFollow[];
};