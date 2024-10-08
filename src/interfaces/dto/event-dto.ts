import { JsonValue } from "@prisma/client/runtime/library";
import CommentDto from "./comment-dto";
import EventLocalizationDto from "./event-localization-dto";
import EventNetworkDto from "./event-network-dto";
import EventNoteDto from "./event-note-dto";
import EventSubscribeDto from "./event-subscribe-dto";
import EventTagDto from "./event-tag-dto";
import UserDto from "./user-dto";

export default interface EventDto {
    id: number
    createdAt: Date
    updatedAt: Date
    publishedAt: Date | null
    published: boolean
    title: string
    description: string
    image?: JsonValue | null
    linkTicketing?: string | null
    adult: boolean
    isValid: boolean
    user: Partial<UserDto>
    comments: CommentDto[]
    startDate: Date
    endDate: Date
    eventTags: EventTagDto[]
    eventNetworks: EventNetworkDto[]
    eventLocalizations: EventLocalizationDto[]
    eventSubscribes: EventSubscribeDto[]
    eventNotes: EventNoteDto[]
}
