import EventDto from "./event-dto";
import TagDto from "./tag-dto";

export default interface EventTagDto {
    id: number
    event: EventDto
    tag: TagDto
};