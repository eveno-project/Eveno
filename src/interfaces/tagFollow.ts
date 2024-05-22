import { Tag } from "./tag";
import { User } from "./user";

export type TagFollow = {
    id: number;
    userId: number;
    tagId: number;
    user?: User;
    tag?: Tag;
};