import Event from "@interfaces/event";
import EventSubscribe from "@interfaces/EventSubscribe";
import prisma from "@utils/db";
import EventDto from "@dto/event-dto";
import Mapper from "@utils/mapper";
import { redirect } from 'next/navigation';
import Localization from "@interfaces/localization";

export async function create(event: Event) {
    try {
        const data: any = {
            adult: event.adult,
            description: event.description,
            endDate: event.endDate,
            image: JSON.stringify(event.images),
            title: event.title,
            linkTicketing: event.linkTicketing,
            isValid: false,
            user: {
                connect: { id: event.user.id }
            },
            startDate: event.startDate,
            eventTags: {
                create: event.tags.map(tag => ({
                    tag: { connect: { id: tag.id } }
                }))
            }
        };


        if (event.localizations) {
            data.eventLocalizations = {
                create: event.localizations
            };
        }

        const eventcreate = await prisma.event.create({
            data
        });
        return eventcreate;
    } catch (error) {
        throw error;
    }
}


export async function update(event: Event) {
    try {
        if (event.id) {
            // Suppression des anciens tags et localisations de l'événement
            await prisma.eventTag.deleteMany({
                where: {
                    eventId: event.id
                }
            });

            await prisma.eventLocalization.deleteMany({
                where: {
                    eventId: event.id
                }
            });

            // Mise à jour de l'événement
            const updatedEvent = await prisma.event.update({
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
                    eventTags: {
                        create: event.tags.map(tag => ({
                            tag: { connect: { id: tag.id } }
                        }))
                    },
                    eventLocalizations: {
                        create: event.localizations
                    }
                }
            });

            return updatedEvent;
        }
    } catch (error) {
        throw error;
    }
}


export async function valid(eventId: number) {
    try {
        if (eventId) {
            await prisma.event.update({
                where: { id: eventId },
                data: {
                    isValid: true,
                }
            });
        }
    } catch (error) {
        throw error;
    }
}

export async function follow(eventId: number, userId: number) {
    try {
        await prisma.eventSubscribe.create({
            data: {
                event: {
                    connect: { id: eventId }
                },
                user: {
                    connect: { id: userId }
                },
                type: ""
            }
        });
    } catch (error) {
        throw error;
    }
}

export async function createComment(eventId: number, userId: number | null, comment: string, parentId: number | null = null) {
    try {
        if (eventId && comment) {
            await prisma.comment.create({
                data: {
                    event: {
                        connect: { id: eventId }
                    },
                    user: userId ? {
                        connect: { id: userId }
                    } : undefined,
                    content: comment,
                    parent: parentId ? {
                        connect: { id: parentId }
                    } : undefined
                }
            });
        }
    } catch (error) {
        throw error;
    }
}


export async function unFollow(eventId: number, userId: number): Promise<void> {
    try {
        await prisma.eventSubscribe.deleteMany({
            where: {
                eventId,
                userId
            }
        });
    } catch (error) {
        throw error;
    }
}

export async function getById(id: number): Promise<Event> {
    try {
        const event = await prisma.event.findUnique({
            where: { id: +id },
            include: {
                eventLocalizations: true,
                user: {
                    select: {
                        password: false,
                    },
                },
                eventTags: {
                    include: {
                        tag: true,
                    }
                },
                comments: {
                    include: {
                        user: {
                            select: {
                                password: false,
                            }
                        },
                    },
                    orderBy: {
                        createdAt: 'desc',
                    },
                },
                eventSubscribes: {
                    include: {
                        user: {
                            select: {
                                password: false,
                            }
                        },
                        event: {
                            include: {
                                user: {
                                    select: {
                                        password: false,
                                    }
                                },
                                eventLocalizations: true,
                                eventNotes: true,
                            }
                        },
                    }
                },
                eventNotes: true,
            }
        }) as unknown as EventDto;

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


export async function deleteOne(eventId: number, userId: number): Promise<boolean> {
    try {
        const event = await prisma.event.findFirst({
            where: {
                id: eventId,
                userId: userId,
            },
        });

        if (!event) {
            throw new Error("Event not found or you don't have permission to delete this event");
        }

        await prisma.event.delete({
            where: { id: eventId },
        });

        // Return true to indicate successful deletion
        return true;
    } catch (error) {
        // Log the error for debugging purposes (optional)
        console.error("Error deleting event:", error);
        // Return false or throw the error to indicate failure
        return false;
    }
}


export async function getAll(sort: 'asc' | 'desc' = 'asc'): Promise<{ events: Event[] }> {
    try {
        const events = (await prisma.event.findMany({
            include: {
                eventLocalizations: true,
                user: {
                    select: {
                        password: false
                    }
                },
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
        return {
            events: events.map(
                Mapper.toEvent
            )
        };
    } catch (error) {
        throw error;
    }
}

export async function getAllValidate(isValid: boolean, sort?: 'asc' | 'desc'): Promise<Event[]> {
    try {
        const events = (await prisma.event.findMany({
            include: {
                eventLocalizations: true,
                user: {
                    select: {
                        password: false,
                    }
                },
                eventTags: {
                    include: {
                        tag: true
                    }
                },
                eventNetworks: true,
                eventNotes: true
            },
            where: {
                isValid: isValid,
                eventTags: {
                    some: {}
                }
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

export async function getByUserEmail(userEmail: string): Promise<{ events: Event[] }> {
    try {
        const events = (await prisma.event.findMany({
            where: {
                user: {
                    email: userEmail
                }
            },
            include: {
                eventLocalizations: true,
                user: {
                    select: {
                        password: false,
                    }
                },
                eventTags: {
                    include: {
                        tag: true
                    }
                },
                eventNetworks: true,
                eventNotes: true
            }
        })) as unknown as EventDto[];

        return {
            events: events.map(Mapper.toEvent)
        };
    } catch (error) {
        throw error;
    }
}


export async function getByUserEmailFollow(userEmail: string): Promise<{ events: Event[] }> {
    try {
        const events = await prisma.event.findMany({
            where: {
                eventSubscribes: {
                    some: {
                        user: {
                            email: userEmail
                        }
                    }
                }
            },
            include: {
                eventLocalizations: true,
                user: {
                    select: {
                        password: false,
                    }
                },
                eventTags: {
                    include: {
                        tag: true
                    }
                },
                eventNetworks: true,
                eventNotes: true,
                eventSubscribes: {
                    include: {
                        user: {
                            select: {
                                password: false,
                            }
                        },
                        event: {
                            include: {
                                user: {
                                    select: {
                                        password: false,
                                    }
                                },
                                eventLocalizations: true,
                                eventNotes: true,
                            }
                        },
                    }
                },
            }
        }) as unknown as EventDto[];


        // Retourner les événements transformés et le nombre total d'événements
        return {
            events: events.map(Mapper.toEvent)
        };
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
                user: {
                    select: {
                        password: false,
                    }
                },
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
                user: {
                    select: {
                        password: false,
                    }
                },
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

export function isUserSubscribed(eventSubscribes: EventSubscribe[], userId: number): boolean {
    return eventSubscribes.some(subscribe => subscribe.user.id === userId);
}