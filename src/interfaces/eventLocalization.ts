import { Event } from "./event";

export interface EventLocalization {
    id: number;
    address: string;
    city: string;
    zipCode: string;
    regionName: string;
    event?: Event;
};