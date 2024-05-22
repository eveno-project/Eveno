import { Event } from "./event";

export type EventLocalization = {
    id: number;
    eventId: number;
    address: string;
    city: string;
    zipCode: string;
    regionName: string;
    event?: Event;
};