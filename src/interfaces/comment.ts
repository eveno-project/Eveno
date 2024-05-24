import User from "./user"

export default interface Comment {
    content: string
    id?: number
    parent?: Partial<Comment>
    replies: Comment[]
    user: Partial<User>
}