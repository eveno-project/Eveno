import Event from "@interfaces/event";
import prisma from "@utils/db";
import EventDto from "@dto/event-dto";
import Mapper from "@utils/mapper";
import { redirect } from 'next/navigation';

export async function create(event: Event) {
    try {
        await prisma.event.create({
            data: {
                adult: event.adult,
                description: event.description,
                endDate: event.endDate,
                image: JSON.stringify(event.images),
                title: event.title,
                linkTicketing: event.linkTicketing,
                isValid: event.isValid,
                user: {
                    connect: { id: event.user.id }
                },
                startDate: event.startDate,
                eventLocalizations: {
                    create: { ...event.localizations, longitude: 0, latitude: 0 }
                },
                eventTags: { 
                    create: event.tags.map(tag => ({
                        tag: { connect: { id: tag.id } }
                    }))
                }
            }
        });
    } catch (error) {
        throw error;
    }
}

export async function update(event: Event) {
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
                    user: {
                        connect: { id: event.user.id }
                    },
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
                    },
                    eventTags: {
                        create: event.tags.map(tag => ({
                            tag: { connect: { id: tag.id } }
                        }))
                    }
                }
            });
        }
    } catch (error) {
        throw error;
    }
}

export async function getById(id: number): Promise<Event> {
    try {
        const event = (await prisma.event.findUnique({
            where: { id: +id },
            include: { eventLocalizations: true, user: true, eventTags: true, eventNetworks: true, eventNotes: true }
        })) as unknown as EventDto;

        if (!event) {
            redirect("/");
        }

        if (!event.user.id) {
            throw new Error("Pas d'utilisateur d'assigner");
        }

        return Mapper.toEvent(event);
    } catch (error) {
        throw error;
    }
}

export async function deleteOne(eventId: number): Promise<void> {
    try {
        await prisma.event.delete({
            where: { id: eventId }
        });

    } catch (error) {
        throw error;
    }
}

export async function getAll(sort?: 'asc' | 'desc'): Promise<Partial<Event>[]> {
    try {
        const events = (await prisma.event.findMany({
            include: {
                eventLocalizations: true,
                user: true,
                eventTags: {
                    include: {
                        tag: true
                    }
                },
                eventNetworks: true,
                eventNotes: true
            },
            orderBy: {
                createdAt: sort
            }
        })) as unknown as EventDto[];

        return events.map(
            Mapper.toEvent
        );
    } catch (error) {
        throw error;
    }
}

export async function getByUserEmail(userEmail: string): Promise<Event[]> {
    try {
        const events = (await prisma.event.findMany({
            where: {
                user: {
                    email: userEmail
                }
            },
            include: {
                eventLocalizations: true,
                user: true,
                eventTags: {
                    include: {
                        tag: true
                    }
                },
                eventNetworks: true,
                eventNotes: true
            }
        })) as unknown as EventDto[];

        return events.map(
            Mapper.toEvent
        );
    } catch (error) {
        throw error;
    }
}

export async function getByTagName(name: string): Promise<Event[]> {
    try {
        const events = await prisma.event.findMany({
            where: {
                eventTags: {
                    some: {
                        tag: {
                            name
                        }
                    }
                }
            },
            include: {
                eventLocalizations: true,
                user: true,
                eventTags: {
                    include: {
                        tag: true
                    }
                },
                eventNetworks: true,
                eventNotes: true
            }
        }) as unknown as EventDto[];
        return events.map(Mapper.toEvent);
    } catch (error) {
        
        throw error;
    }
}

export async function getManyByName(name: string): Promise<Event[]> {
    try {
        const events = await prisma.event.findMany({
            where: {
                title: {
                    contains: name,
                    mode: 'insensitive'
                }
            },
            include: {
                eventLocalizations: true,
                user: true,
                eventTags: {
                    include: {
                        tag: true
                    }
                },
                eventNetworks: true,
                eventNotes: true
            }
        }) as unknown as EventDto[];
        return events.map(Mapper.toEvent)
    } catch (error) {
        throw error;
    }
}