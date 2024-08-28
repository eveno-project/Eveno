import Event from "@interfaces/event";
import EventSubscribe from "@interfaces/EventSubscribe";
import prisma from "@utils/db";
import EventDto from "@dto/event-dto";
import Mapper from "@utils/mapper";
import { redirect } from 'next/navigation';
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/auth";

// Sélection des champs à inclure lors de la récupération des utilisateurs liés aux événements
const userSelect = {
    id: true,
    username: true,
    email: true,
    token: true,
    image: true,
    adult: true,
    birthday: true,
    roleId: true,
    role: true,
    comments: true,
    events: true,
    tagFollows: true,
    eventSubscribes: true,
    eventNotes: true,
}

// Fonction pour créer un nouvel événement dans la base de données
export async function create(event: Event) {
    try {
        // Préparation des données pour la création d'un nouvel événement
        const data: any = {
            adult: event.adult,
            description: event.description,
            endDate: event.endDate,
            image: JSON.stringify(event.images), // Conversion des images en chaîne JSON
            title: event.title,
            linkTicketing: event.linkTicketing,
            isValid: false, // L'événement est créé comme non valide par défaut
            user: {
                connect: { id: event.user.id } // Association de l'utilisateur créateur à l'événement
            },
            startDate: event.startDate,
            eventTags: {
                create: event.tags.map((tag: { id: any; }) => ({
                    tag: { connect: { id: tag.id } } // Association des tags à l'événement
                }))
            }
        };

        // Ajout des localisations si elles existent
        if (event.localizations) {
            data.eventLocalizations = {
                create: event.localizations
            };
        }

        // Création de l'événement dans la base de données via Prisma
        const eventcreate = await prisma.event.create({
            data
        });
        return eventcreate; // Retourne l'événement créé
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour mettre à jour un événement existant dans la base de données
export async function update(event: Event) {
    try {
        if (event.id) {
            // Suppression des anciens tags associés à l'événement
            await prisma.eventTag.deleteMany({
                where: {
                    eventId: event.id
                }
            });

            // Suppression des anciennes localisations associées à l'événement
            await prisma.eventLocalization.deleteMany({
                where: {
                    eventId: event.id
                }
            });

            // Mise à jour des informations de l'événement dans la base de données
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
                        create: event.tags.map((tag: { id: any; }) => ({
                            tag: { connect: { id: tag.id } }
                        }))
                    },
                    eventLocalizations: {
                        create: event.localizations
                    }
                }
            });

            return updatedEvent; // Retourne l'événement mis à jour
        }
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour valider un événement en le marquant comme valide dans la base de données
export async function valid(eventId: number) {
    try {
        if (eventId) {
            await prisma.event.update({
                where: { id: eventId },
                data: {
                    isValid: true, // Mise à jour du champ isValid à true
                }
            });
        }
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour qu'un utilisateur suive un événement
export async function follow(eventId: number, userId: number) {
    try {
        await prisma.eventSubscribe.create({
            data: {
                event: {
                    connect: { id: eventId } // Association de l'événement à suivre
                },
                user: {
                    connect: { id: userId } // Association de l'utilisateur qui suit l'événement
                },
                type: "" // Champ type laissé vide
            }
        });
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour créer un commentaire sur un événement
export async function createComment(eventId: number, userId: number | null, comment: string, parentId: number | null = null) {
    try {
        if (eventId && comment) {
            await prisma.comment.create({
                data: {
                    event: {
                        connect: { id: eventId } // Association du commentaire à l'événement
                    },
                    user: userId ? {
                        connect: { id: userId } // Association de l'utilisateur au commentaire
                    } : undefined,
                    content: comment, // Contenu du commentaire
                    parent: parentId ? {
                        connect: { id: parentId } // Association du commentaire parent si existant
                    } : undefined
                }
            });
        }
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour qu'un utilisateur cesse de suivre un événement
export async function unFollow(eventId: number, userId: number): Promise<void> {
    try {
        await prisma.eventSubscribe.deleteMany({
            where: {
                eventId, // Identification de l'événement
                userId  // Identification de l'utilisateur
            }
        });
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour récupérer un événement par son ID
export async function getById(id: number): Promise<Event> {
    try {
        const session = await getServerSession(authOptions); // Récupération de la session utilisateur
        const userId = session?.user.id;

        const event = await prisma.event.findUnique({
            where: { id: +id }, // Recherche de l'événement par ID
            include: {
                eventLocalizations: true, // Inclusion des localisations de l'événement
                user: {
                    select: userSelect // Sélection des champs utilisateur
                },
                eventTags: {
                    include: {
                        tag: true, // Inclusion des tags associés à l'événement
                    }
                },
                comments: {
                    include: {
                        user: {
                            select: userSelect // Sélection des champs utilisateur dans les commentaires
                        },
                    },
                    orderBy: {
                        createdAt: 'desc', // Tri des commentaires par date de création décroissante
                    },
                },
                eventSubscribes: {
                    include: {
                        user: {
                            select: userSelect // Sélection des champs utilisateur dans les abonnements
                        },
                        event: {
                            include: {
                                user: {
                                    select: userSelect // Sélection des champs utilisateur dans l'événement abonné
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
            redirect("/"); // Redirection si l'événement n'est pas trouvé
        }

        // if (event && !event.published && event.user.id !== userId) {
        //     redirect("/"); // Redirection si l'événement n'est pas publié et que l'utilisateur n'est pas le créateur
        // }

        if (event && (!event.user || !event.user.id)) {
            throw new Error("Pas d'utilisateur d'assigner"); // Erreur si l'utilisateur associé à l'événement est manquant
        }
        return Mapper.toEvent(event); // Conversion du DTO en objet métier et retour de l'événement
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour supprimer un événement en s'assurant que l'utilisateur est le créateur
export async function deleteOne(eventId: number, userId: number): Promise<boolean> {
    try {
        const event = await prisma.event.findFirst({
            where: {
                id: eventId,
                userId: userId, // Vérification que l'utilisateur est bien le créateur de l'événement
            },
        });

        if (!event) {
            throw new Error("Event not found or you don't have permission to delete this event"); // Erreur si l'événement n'existe pas ou si l'utilisateur n'est pas autorisé à le supprimer
        }

        await prisma.event.delete({
            where: { id: eventId }, // Suppression de l'événement
        });

        // Retourne true pour indiquer la réussite de la suppression
        return true;
    } catch (error) {
        // Journalisation de l'erreur pour le débogage (optionnel)
        console.error("Error deleting event:", error);
        // Retourne false ou lève l'erreur pour indiquer l'échec
        return false;
    }
}

// Fonction pour récupérer tous les événements, avec un tri possible par date de création
export async function getAll(sort: 'asc' | 'desc' = 'asc'): Promise<{ events: Event[] }> {
    try {
        const events = (await prisma.event.findMany({
            include: {
                eventLocalizations: true, // Inclusion des localisations de l'événement
                user: {
                    select: userSelect // Sélection des champs utilisateur
                },
                eventTags: {
                    include: {
                        tag: true // Inclusion des tags associés à l'événement
                    }
                },
                eventNetworks: true,
                eventNotes: true
            },
            orderBy: {
                createdAt: sort // Tri par date de création
            }
        })) as unknown as EventDto[];
        return {
            events: events.map(
                Mapper.toEvent // Conversion des DTOs en objets métier
            )
        };
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour récupérer les événements validés ou non, avec un tri optionnel
export async function getAllValidate(isValid: boolean, sort?: 'asc' | 'desc'): Promise<Event[]> {
    try {
        const events = (await prisma.event.findMany({
            include: {
                eventLocalizations: true,
                user: {
                    select: userSelect
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
                isValid: isValid, // Filtrage par statut de validation
                eventTags: {
                    some: {} // Filtre sur les événements ayant des tags (condition vide)
                }
            },
            orderBy: {
                createdAt: sort // Tri par date de création
            }
        })) as unknown as EventDto[];

        return events.map(
            Mapper.toEvent // Conversion des DTOs en objets métier
        );
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour récupérer tous les événements créés par un utilisateur spécifié par son email
export async function getByUserEmail(userEmail: string): Promise<{ events: Event[] }> {
    try {
        const events = (await prisma.event.findMany({
            where: {
                user: {
                    email: userEmail // Filtre par email de l'utilisateur
                }
            },
            include: {
                eventLocalizations: true,
                user: {
                    select: userSelect
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
            events: events.map(Mapper.toEvent) // Conversion des DTOs en objets métier
        };
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour récupérer les événements suivis par un utilisateur spécifié par son email
export async function getByUserEmailFollow(userEmail: string): Promise<{ events: Event[] }> {
    try {
        const events = await prisma.event.findMany({
            where: {
                eventSubscribes: {
                    some: {
                        user: {
                            email: userEmail // Filtre par email de l'utilisateur abonné
                        }
                    }
                }
            },
            include: {
                eventLocalizations: true,
                user: {
                    select: userSelect
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
                            select: userSelect
                        },
                        event: {
                            include: {
                                user: {
                                    select: userSelect
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
            events: events.map(Mapper.toEvent) // Conversion des DTOs en objets métier
        };
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour récupérer les événements associés à un tag spécifié par son nom
export async function getByTagName(name: string): Promise<Event[]> {
    try {
        const events = await prisma.event.findMany({
            where: {
                eventTags: {
                    some: {
                        tag: {
                            name // Filtre par nom du tag
                        }
                    }
                }
            },
            include: {
                eventLocalizations: true,
                user: {
                    select: userSelect
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
        return events.map(Mapper.toEvent); // Conversion des DTOs en objets métier
    } catch (error) {

        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour récupérer les événements dont le titre contient un nom spécifié (recherche insensible à la casse)
export async function getManyByName(name: string): Promise<Event[]> {
    try {
        const events = await prisma.event.findMany({
            where: {
                title: {
                    contains: name, // Filtre par contenu du titre
                    mode: 'insensitive' // Recherche insensible à la casse
                }
            },
            include: {
                eventLocalizations: true,
                user: {
                    select: userSelect
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
        return events.map(Mapper.toEvent); // Conversion des DTOs en objets métier
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour vérifier si un utilisateur est abonné à un événement
export function isUserSubscribed(eventSubscribes: EventSubscribe[], userId: number): boolean {
    return eventSubscribes.some(subscribe => subscribe.user.id === userId); // Vérifie si l'utilisateur est dans la liste des abonnés
}
