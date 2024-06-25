import Image from "./image"
import Localization from "./localization"
import Network from "./network"
import Note from "./note"
import Tag from "./tag"
import User from "./user"

export default interface Event {
    adult: boolean
    comments: Comment[]
    createdAt: Date
    description: string
    id?: number
    images?: Image[]
    updatedAt: Date
    publishedAt: Date
    published: boolean
    title: string
    linkTicketing?: string
    isValid?: boolean
    user: Partial<User>
    tags: Tag[]
    networks: Network[]
    localization: Localization
    notes: Note[]
    startDate: Date
    endDate: Date
}