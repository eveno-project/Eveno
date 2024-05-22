import { User } from "./user";

export type Role = {
    id: number;
    name: string;
    users?: User[];
};