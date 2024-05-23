import { Event } from "./event";
import { Network } from "./network";

export interface EventNetwork {
    id: number;
    link: string;
    event?: Event;
    network?: Network;
};