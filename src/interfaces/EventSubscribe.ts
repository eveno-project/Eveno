import User from "./user"
import Event from "./event"

export default interface EventSubscribe {
    id?: number
    user: Partial<User>
    event: Partial<Event>
    type: string
}

