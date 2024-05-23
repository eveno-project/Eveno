import { Comment } from "./comment";
import { EventLocalization } from "./eventLocalization";
import { EventNetwork } from "./eventNetwork";
import { EventNote } from "./eventNote";
import { EventSubscribe } from "./eventSubscribe";
import { EventTag } from "./eventTag";
import { User } from "./user";

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