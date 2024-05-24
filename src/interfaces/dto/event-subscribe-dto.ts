import EventDto from "./event-dto";
import UserDto from "./user-dto";

export default interface EventSubscribeDto {
    id: number
    type: string
    user?: UserDto
    event?: EventDto
}