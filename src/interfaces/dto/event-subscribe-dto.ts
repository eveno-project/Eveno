import EventDto from "./event-dto";
import UserDto from "./user-dto";

export default interface EventSubscribeDto {
    id: number
    type: string
    event: EventDto
    user: UserDto
}