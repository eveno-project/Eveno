import EventDto from "./event-dto";
import UserDto from "./user-dto";

export default interface CommentDto {
    id: number
    content: string
    event: EventDto
    user: UserDto
    parent?: CommentDto
    replies: CommentDto[]
}