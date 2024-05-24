import CommentDto from "./comment-dto";
import EventDto from "./event-dto";
import EventNoteDto from "./event-note-dto";
import EventSubscribeDto from "./event-subscribe-dto";
import RoleDto from "./role-dto";
import TagFollowDto from "./tag-follow-dto";

export default interface UserDto {
    id: number
    username: string
    password: string
    email: string
    token: string
    image?: JSON
    adult: boolean
    birthday: Date
    role: RoleDto
    comments: CommentDto[]
    events: EventDto[]
    tagFollows: TagFollowDto[]
    eventSubscribes: EventSubscribeDto[]
    eventNotes: EventNoteDto[]
}