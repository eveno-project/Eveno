import { Event } from "./event";
import { Network } from "./network";

export type EventNetwork = {
    id: number;
    networkId: number;
    eventId: number;
    link: string;
    event?: Event;
    network?: Network;
};