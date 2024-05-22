import { EventNetwork } from "./eventNetwork";

export type Network = {
    id: number;
    name: string;
    eventNetworks?: EventNetwork[];
};