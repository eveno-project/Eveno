import Event from "@interfaces/event";
import prisma from "@utils/db";
import EventDto from "@dto/event-dto";
import Mapper from "@utils/mapper";
import { getTagsByIds } from "./tag";


export async function create(event: Event): Promise<void> {
    let transaction;
    try {
        event.user = { id: 3 };
        const eventData = {
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
            },
        };

        if (event.tags.length > 0) {
            const tags = await getTagsByIds(event.tags);
            console.log('Fetched tags:', tags);

            eventData['eventTags'] = {
                create: tags.map((tag) => ({
                    tag: { connect: { id: tag.id } }
                })),
            };
        }

        transaction = await prisma.$transaction([
            prisma.event.create({
                data: eventData,
            }),
        ]);

        console.log("Event created:", transaction[0]);
    } catch (error) {
        console.error("Error creating event:", error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

export async function update(event: Event): Promise<void> {
    event.user = { id: 3 };
    let transaction;

    try {
        if (event.id) {
            await prisma.eventTag.deleteMany({
                where: { eventId: parseInt(event.id, 10) }
            })
            const eventData = {
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
            };

            if (event.tags.length > 0) {
                const tags = await getTagsByIds(event.tags);
                console.log('Fetched tags:', tags);

                eventData['eventTags'] = {
                    create: tags.map((tag) => ({
                        tag: { connect: { id: tag.id } }
                    })),
                };
            }

            transaction = await prisma.$transaction([
                prisma.event.update({
                    where: { id: parseInt(event.id, 10) },
                    data: eventData,
                }),
            ]);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getById(eventId: number): Promise<Event | undefined> {
    try {
        const event = (await prisma.event.findUnique({
            where: { id: parseInt(eventId, 10) },
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
        console.error(error);
        throw error;
    }
}