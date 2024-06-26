import Comment from "./comment"
import Image from "./image"
import Role from "./role"
import { AdapterUser } from "next-auth/adapters";

export default interface User {
    adult: boolean
    birthday: Date
    email: string
    id?: number
    image?: string
    password: string
    role: Role
    token: string
    username: string
}

export interface UserAuth extends AdapterUser {
    id: string,
    username: string,
    email: string,
    roleId: number,
    adult: boolean
    emailVerified: Date | null
}
