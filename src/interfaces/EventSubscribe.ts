import User from "./user"
import Event from "./event"

export default interface EventSubscribe {
    id?: number
    userId: number
    eventId: number
    type: string
}