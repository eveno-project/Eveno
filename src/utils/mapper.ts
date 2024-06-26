import CommentDto from "@dto/comment-dto";
import EventDto from "@dto/event-dto";
import EventLocalizationDto from "@dto/event-localization-dto";
import EventNetworkDto from "@dto/event-network-dto";
import EventNoteDto from "@dto/event-note-dto";
import EventTagDto from "@dto/event-tag-dto";
import UserDto from "@dto/user-dto";
import Comment from "@interfaces/comment";
import Event from "@interfaces/event";
import Image from "@interfaces/image";
import Localization from "@interfaces/localization";
import Network from "@interfaces/network";
import Note from "@interfaces/note";
import Tag from "@interfaces/tag";
import User from "@interfaces/user";
import { JsonValue } from "@prisma/client/runtime/library";

export default class Mapper {
    static toEvent(eventDto: EventDto): Event {
        return {
            adult: eventDto.adult,
            comments: eventDto.comments?.map(Mapper.toComment),
            createdAt: new Date(eventDto.createdAt),
            description: eventDto.description,
            id: eventDto.id,
            images: Mapper.parseImages(eventDto.image),
            updatedAt: new Date(eventDto.updatedAt),
            publishedAt: eventDto.publishedAt ? new Date(eventDto.publishedAt) : undefined,
            title: eventDto.title,
            linkTicketing: eventDto.linkTicketing ? eventDto.linkTicketing : undefined,
            isValid: eventDto.isValid,
            user: Mapper.toUser(eventDto.user),
            tags: eventDto.eventTags?.map(Mapper.toTags),
            networks: eventDto.eventNetworks?.map(Mapper.toNetwork),
            localizations: eventDto.eventLocalizations.map(Mapper.toLocalization),
            endDate: new Date(eventDto.endDate),
            notes: eventDto.eventNotes.map(Mapper.toNote),
            published: eventDto.published,
            startDate: new Date(eventDto.startDate),
        };
    }

    static toComment(commentDto: CommentDto): Comment {
        return {
            content: commentDto.content,
            id: commentDto.id,
            parent: commentDto.parent ? Mapper.toComment(commentDto.parent) : undefined,
            replies: commentDto.replies.map(Mapper.toComment),
            user: Mapper.toUser(commentDto.user),
        };
    }

    static toUser(userDto: Partial<UserDto>): Partial<User> {
        return {
            adult: userDto.adult,
            birthday: userDto.birthday,
            email: userDto.email,
            id: userDto.id,
            image: userDto.email,
            password: userDto.password,
            role: userDto.role,
            token: userDto.token,
            username: userDto.username
        };
    }

    static parseImages(imageJson: JsonValue | undefined): Image[] {
        if (!imageJson) return [];
        try {
            const images: Image[] = JSON.parse(imageJson as string);
            return images;
        } catch (error) {
            console.error('Error parsing images:', error);
            return [];
        }
    }

    static toTags(eventTagDto: EventTagDto): Tag {
        return {
            id: eventTagDto.tag?.id,
            name: eventTagDto.tag?.name
        };
    }

    static toNetwork(eventNetworkDto: EventNetworkDto): Network {
        return {
            id: eventNetworkDto.network.id,
            link: eventNetworkDto.link,
            name: eventNetworkDto.network.name
        };
    }

    static toLocalization(eventLocalizationDto: EventLocalizationDto): Localization {
        return {
            address: eventLocalizationDto.address,
            city: eventLocalizationDto.city,
            latitude: eventLocalizationDto.latitude,
            longitude: eventLocalizationDto.longitude,
            regionName: eventLocalizationDto.regionName,
            zipCode: eventLocalizationDto.zipCode,
            id: eventLocalizationDto.id
        }
    }

    static toNote(eventNoteDto: EventNoteDto): Note {
        return {
            id: eventNoteDto.id,
            value: eventNoteDto.value,
            user: Mapper.toUser(eventNoteDto.user)
        };
    }
}
