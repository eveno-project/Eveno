import TagDto from "./tag-dto";
import UserDto from "./user-dto";

export default interface TagFollowDto {
    id: number
    user?: UserDto
    tag?: TagDto
}