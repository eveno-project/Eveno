import Event from "@interfaces/event";
import prisma from "@utils/db";
import Localization from "@interfaces/localization";
import User from "@interfaces/user";
import EventDto from "@dto/event-dto";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";


export async function create(event: Event): Promise<void> {
    try {

        event.user = { id: 3 };

        const newEvent = await prisma.event.create({
            data: {
                adult: event.adult,
                description: event.description,
                endDate: event.endDate,
                image: JSON.stringify(event.images),
                title: event.title,
                linkTicketing: event.linkTicketing,
                isValid: event.isValid,
                userId: event.user.id,
                startDate: event.startDate,
                eventLocalizations: {
                    create: { ...event.localization, longitude: 0, latitude: 0 }
                }
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}



export async function update(event: Event): Promise<void> {
    event.user = { id: 3 };
    try {
        if (event.id) {
            await prisma.event.update({
                where: { id: parseInt(event.id, 10) },
                data: {
                    adult: event.adult,
                    description: event.description,
                    endDate: event.endDate,
                    image: JSON.stringify(event.image),
                    title: event.title,
                    linkTicketing: event.linkTicketing,
                    isValid: event.isValid,
                    userId: event.user.id,
                    startDate: event.startDate,
                    eventLocalizations: {
                        update: {
                            where: { id: parseInt(event.localization.id, 10) },
                            data: {
                                ...event.localization,
                                longitude: 0,
                                latitude: 0
                            }
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getById(eventId: number): Promise<Event | undefined> {
    try {
        const event = await prisma.event.findUnique({
            where: { id: parseInt(eventId, 10) },
            include: { eventLocalizations: true, user: true, eventTags: true, eventNetworks: true, eventNotes: true }
        });

        if (!event) {
            throw new Error("L'event n'existe pas");
        }

        if (!event.userId) {
            throw new Error("Pas d'utilisateur d'assigner");
        }


        const transformedEvent: Event = {
            id: event.id,
            adult: event.adult,
            description: event.description,
            endDate: event.endDate,
            // image: event.image,
            tags: [],
            // tags: event.eventTags,
            networks: [],
            // networks: event.eventNetworks,
            notes: event.eventNotes,
            title: event.title,
            linkTicketing: event.linkTicketing ?? undefined,
            isValid: event.isValid,
            user: { id: event.userId },
            startDate: event.startDate,
            comments: [],
            createdAt: event.createdAt,
            updatedAt: event.updatedAt,
            publishedAt: event.publishedAt ?? undefined,
            published: event.published,
            localization: event.eventLocalizations

        };

        return transformedEvent;
    } catch (error) {
        console.error(error);
        throw error;
    }
}




export async function deleteOne(eventId: number): Promise<void> {
    try {
        await prisma.event.delete({
            where: { id: parseInt(eventId, 10) }
        });

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAll(): Promise<Event[]> {
    try {
        const events = await prisma.event.findMany({
            include: {
                eventLocalizations: true,
                user: true,
                eventTags: true,
                eventNetworks: true,
                eventNotes: true
            }
        });

        const transformedEvents = events.map(event => ({
            id: event.id,
            adult: event.adult,
            description: event.description,
            endDate: event.endDate,
            tags: [],
            networks: [],
            notes: event.eventNotes,
            title: event.title,
            linkTicketing: event.linkTicketing ?? undefined,
            isValid: event.isValid,
            user: { id: event.userId ?? undefined },
            startDate: event.startDate,
            comments: [],
            createdAt: event.createdAt,
            updatedAt: event.updatedAt,
            publishedAt: event.publishedAt ?? undefined,
            published: event.published,
            localization: event.eventLocalizations
        }));

        return transformedEvents;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function getByUserEmail(userEmail: string): Promise<Event[]> {
    try {
        // Fetch the events by joining the user table based on email
        const events = await prisma.event.findMany({
            where: {
                user: {
                    email: userEmail
                }
            },
            include: {
                eventLocalizations: true,
                user: true,
                eventTags: true,
                eventNetworks: true,
                eventNotes: true
            }
        });

        // Transform the events to match the DTO structure
        const transformedEvents = events.map(event => ({
            id: event.id,
            adult: event.adult,
            description: event.description,
            endDate: event.endDate,
            tags: event.eventTags,
            networks: event.eventNetworks,
            notes: event.eventNotes,
            title: event.title,
            linkTicketing: event.linkTicketing ?? undefined,
            isValid: event.isValid,
            user: { id: event.userId ?? undefined },
            startDate: event.startDate,
            comments: [],
            createdAt: event.createdAt,
            updatedAt: event.updatedAt,
            publishedAt: event.publishedAt ?? undefined,
            published: event.published,
            localization: event.eventLocalizations
        }));

        return transformedEvents;
    } catch (error) {
        console.error(error);
        throw error;
    }
}