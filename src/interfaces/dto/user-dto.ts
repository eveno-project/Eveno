import CommentDto from "./comment-dto";
import EventDto from "./event-dto";
import EventNoteDto from "./event-note-dto";
import EventSubscribeDto from "./event-subscribe-dto";
import RoleDto from "./role-dto";
import TagFollowDto from "./tag-follow-dto";

export default interface UserDto {
    adult: boolean
    birthday: Date
    comments: CommentDto[]
    email: string
    eventNotes: EventNoteDto[]
    events: EventDto[]
    eventSubscribes: EventSubscribeDto[]
    id: number
    image?: string
    password: string
    role: RoleDto
    tagFollows: TagFollowDto[]
    token: string
    username: string
}