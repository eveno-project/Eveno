import Event from "@interfaces/event";
import EventSubscribe from "@interfaces/EventSubscribe";
import prisma from "@utils/db";
import EventDto from "@dto/event-dto";
import Mapper from "@utils/mapper";
import { redirect } from 'next/navigation';
import Localization from "@interfaces/localization";

export async function create(event: Event) {
    try {
        const localization = event?.localizations.length !== 0 ? { ...event.localizations, longitude: 0, latitude: 0 } : undefined;
        await prisma.event.create({
            data: {
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
                eventLocalizations: {
                    create: localization
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
            await prisma.eventTag.deleteMany({
                where: {
                    eventId: event.id
                }
            });

            await prisma.event.update({
                where: { id: event.id },
                data: {
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
                    eventLocalizations: {
                        update: {
                            where: { id: (event.localizations as unknown as Localization).id },
                            data: { ...event.localizations as unknown as Localization }
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
        if (eventId && userId) {
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
        }
    } catch (error) {
        throw error;
    }
}

export async function comment(eventId: number, userId: number, comment: string) {
    try {
        if (eventId && userId && comment) {
            await prisma.comment.create({
                data: {
                    event: {
                        connect: { id: eventId }
                    },
                    user: {
                        connect: { id: userId }
                    },
                    content: comment
                }
            });
        }
    } catch (error) {
        throw error;
    }
}

export async function unFollow(eventId: number, userId: number): Promise<void> {
    try {
        if (eventId && userId) {
            await prisma.eventSubscribe.deleteMany({
                where: {
                    eventId: eventId,
                    userId: userId,
                },
            });
        }

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
                user: true,
                eventTags: {
                    include: {
                        tag: true,
                    }
                },
                comments: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        id: 'desc',
                    },
                },
                eventSubscribes: {
                    include: {
                        user: true,
                        event: {
                            include: {
                                user: true,
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
            where: {
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


export async function getAllValidate(isValid: boolean, sort?: 'asc' | 'desc'): Promise<Partial<Event>[]> {
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


export async function getByUserEmailFollow(userEmail: string): Promise<Event[]> {
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
                user: true,
                eventTags: {
                    include: {
                        tag: true
                    }
                },
                eventNetworks: true,
                eventNotes: true,
                eventSubscribes: {
                    include: {
                        user: true,
                        event: {
                            include: {
                                user: true,
                                eventLocalizations: true,
                                eventNotes: true,
                            }
                        },
                    }
                },
            }
        }) as unknown as EventDto[];

        return events.map(Mapper.toEvent);
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