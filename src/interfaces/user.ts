import Comment from "./comment"
import Image from "./image"
import Role from "./role"

export default interface User {
    adult: boolean
    birthday: Date
    email: string
    id?: number
    image?: Image
    password: string
    role: Role
    token: string
    username: string
}