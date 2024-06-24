import Event from "@interfaces/event";
import prisma from "@utils/db";
import Localization from "@interfaces/localization";
import User from "@interfaces/user";
import EventDto from "@dto/event-dto";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";
import Mapper from "@utils/mapper";


export async function create(event: Event): Promise<void> {
    event.user = { id: 3 };
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
                    create: { ...event.localizations, longitude: 0, latitude: 0 }
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
                where: { id: event.id },
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
                        update: {
                            where: { id: event.localizations[0]?.id },
                            data: {
                                ...event.localizations,
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
        const event = (await prisma.event.findUnique({
            where: { id: eventId },
            include: { eventLocalizations: true, user: true, eventTags: true, eventNetworks: true, eventNotes: true }
        })) as unknown as EventDto;

        if (!event) {
            throw new Error("L'event n'existe pas");
        }

        if (!event.user.id) {
            throw new Error("Pas d'utilisateur d'assigner");
        }

        return Mapper.toEvent(event);
    } catch (error) {
        console.error(error);
        throw error;
    }
}




export async function deleteOne(eventId: number): Promise<void> {
    try {
        await prisma.event.delete({
            where: { id: eventId }
        });

    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAll(): Promise<Event[]> {
    try {
        const events = (await prisma.event.findMany({
            include: {
                eventLocalizations: true,
                user: true,
                eventTags: true,
                eventNetworks: true,
                eventNotes: true
            }
        })) as unknown as EventDto[];

        return events.map(
            Mapper.toEvent
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function getByUserEmail(userEmail: string): Promise<Event[]> {
    try {
        // Fetch the events by joining the user table based on email
        const events = (await prisma.event.findMany({
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
        })) as unknown as EventDto[];

        return events.map(
            Mapper.toEvent
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}