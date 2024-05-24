import EventTagDto from "./event-tag-dto";
import TagFollowDto from "./tag-follow-dto";

export default interface TagDto {
    id: number
    name: string
    eventTags: EventTagDto[]
    tagFollows: TagFollowDto[]
}