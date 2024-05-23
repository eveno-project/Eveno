import { EventNetwork } from "./event/event-network";

export interface Network {
    id: number;
    name: string;
    eventNetworks: EventNetwork[];
};