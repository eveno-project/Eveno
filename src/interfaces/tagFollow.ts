import { Tag } from "./tag";
import { User } from "./user";

export interface TagFollow {
    id: number;
    user?: User;
    tag?: Tag;
};