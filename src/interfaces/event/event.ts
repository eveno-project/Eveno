import { Comment } from "../comment";
import { EventLocalization } from "./event-localization";
import { EventNetwork } from "./event-network";
import { EventNote } from "./event-note";
import { EventSubscribe } from "./event-subscribe";
import { EventTag } from "./event-tag";
import { User } from "../user";

export interface Event {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    publishAt: Date;
    published: boolean;
    title: string;
    description: string;
    image?: any;
    linkTicketing?: string;
    adult: boolean;
    isValid: boolean;
    user: Partial<User>;
    comments: Comment[];
    eventTags: EventTag[];
    eventNetworks: EventNetwork[];
    eventLocalizations: EventLocalization[];
    eventSubscribes: EventSubscribe[];
    eventNotes: EventNote[];
};