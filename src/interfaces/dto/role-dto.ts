import UserDto from "./user-dto";

export default interface RoleDto {
    id: number
    name: string
    users: UserDto[]
}