import User from "@interfaces/user";

export default interface Note {
    id?: number
    value: number
    user: Partial<User>
}
