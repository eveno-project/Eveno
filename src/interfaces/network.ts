import { EventNetwork } from "./eventNetwork";

export interface Network {
    id: number;
    name: string;
    eventNetworks: EventNetwork[];
};