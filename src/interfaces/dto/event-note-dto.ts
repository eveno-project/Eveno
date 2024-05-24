import EventDto from "./event-dto";
import UserDto from "./user-dto";

export default interface EventNoteDto {
    id: number
    value: number
    event?: EventDto
    user?: UserDto
}