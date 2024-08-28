import { Prisma, PrismaClient } from "@prisma/client";
import { fakerFR } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function dropDatabase() {
    console.info('Delete data…');
    await prisma.network.deleteMany();
    await prisma.role.deleteMany();
    await prisma.user.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.event.deleteMany();
}

function createComments(eventId: number) {
    const comments = [];
    for (let i = 0; i < 20; i++) {
        comments.push({
            content: fakerFR.hacker.phrase(),
            userId: fakerFR.number.int({ min: 3, max: 12 }),
            eventId,
            createdAt: fakerFR.date.past(),
        });
    }
    return comments;
}

function createEventTags() {
    const tagsId: { tagId: number }[] = [];
    for (let i = 0; i < fakerFR.number.int({ min: 1, max: 10 }); i++) {
        tagsId.push({ tagId: fakerFR.number.int({ min: 1, max: 10 }) });
    }
    return tagsId;
}

function createEventNotes() {
    const eventNotes: { value: number, userId: number }[] = [];
    for (let i = 0; i < fakerFR.number.int({ min: 1, max: 100 }); i++) {
        eventNotes.push({
            userId: fakerFR.number.int({ min: 1, max: 12 }),
            value: fakerFR.number.int({ min: 0, max: 5 })
        })
    }
    return eventNotes;
}

function createEventImage() {
    const image = [] as Prisma.JsonArray;
    for (let i = 0; i < fakerFR.number.int({ min: 0, max: 5 }); i++) {
        image.push({ src: fakerFR.image.url(), alt: fakerFR.company.name() })
    }
    return image;
}

async function main() {
    await prisma.role.createMany({
        data: [
            {
                name: 'USER'
            },
            {
                name: 'ADMIN'
            }
        ]
    })

    console.log('Create USER');
    if (!(await prisma.user.findUnique({ where: { email: 'admin@eveno.com' } }))?.email) {
        await prisma.user.create({
            data: {
                username: 'ADMIN',
                adult: true,
                birthday: fakerFR.date.past(),
                email: 'admin@eveno.com',
                password: await bcrypt.hash('Senior-Audacity-Childlike7-Barber', 10),
                role: {
                    connect: {
                        id: 2
                    }
                },
                token: randomUUID(),
                image: 'https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?format=pjeg&auto=webp&crop=4:3',
            }
        });
    }
    if (!(await prisma.user.findUnique({ where: { email: 'john.doe@eveno.com' } }))?.email) {
        await prisma.user.create({
            data: {
                username: 'USERTEST',
                adult: true,
                birthday: fakerFR.date.past(),
                email: 'john.doe@eveno.com',
                password: await bcrypt.hash('Whacky-Snowman2-Untoasted-Provided', 10),
                role: {
                    connect: {
                        id: 1
                    }
                },
                token: randomUUID(),
                image: 'https://i.pinimg.com/236x/24/00/4f/24004f4c9290a8cdf113cee8df3bcd4d.jpg',
            }
        });
    }
    for (let i = 0; i < 10; i++) {
        const username = fakerFR.internet.userName();
        await prisma.user.create({
            data: {
                username,
                adult: fakerFR.datatype.boolean(),
                birthday: fakerFR.date.past(),
                email: `${username}@gmail.com`,
                password: await bcrypt.hash('Whacky-Snowman2-Untoasted-Provided', 10),
                role: {
                    connect: {
                        id: 1
                    }
                },
                token: randomUUID(),
                image: fakerFR.image.url(),
            }
        })
    }

    console.log('Create Tags')

    for (let i = 0; i < 20; i++) {
        await prisma.tag.createMany({
            data: [
                { name: 'Festival' },
                { name: 'Concert' },
                { name: 'Exposition' },
                { name: 'Spectacle' },
                { name: 'Carnaval' },
                { name: 'Atelier' },
                { name: 'Performance' },
                { name: 'Comédie' },
                { name: 'Parade' },
                { name: 'Rave' }
            ],
            skipDuplicates: true,
        })
    }

    console.log('Create Events')
    for (let i = 0; i < 20; i++) {
        const isValid = fakerFR.datatype.boolean();
        await prisma.event.create({
            data: {
                adult: fakerFR.datatype.boolean(),
                description: fakerFR.commerce.productDescription(),
                startDate: fakerFR.date.past(),
                endDate: fakerFR.date.future(),
                title: fakerFR.animal.type(),
                eventTags: {
                    createMany: {
                        data: createEventTags(),
                        skipDuplicates: true
                    }
                },
                eventLocalizations: {
                    create: {
                        address: fakerFR.location.streetAddress(),
                        city: fakerFR.location.city(),
                        latitude: fakerFR.location.latitude(),
                        longitude: fakerFR.location.longitude(),
                        regionName: fakerFR.location.country(),
                        zipCode: +fakerFR.location.zipCode('#####'),
                    },
                },
                isValid,
                eventNotes: {
                    createMany: {
                        data: createEventNotes(),
                    },
                },
                published: isValid ? fakerFR.datatype.boolean() : false,
                user: {
                    connect: {
                        id: fakerFR.number.int({ min: 1, max: 12 }),
                    },
                },
                image: createEventImage(),
                linkTicketing: 'https://trollface.dk/'
            },
        })
    }

    console.log('Create Comments')
    for (let i = 0; i < 20; i++) {
        const eventId = fakerFR.number.int({min: 1, max: 20});
        await prisma.comment.create({
            data: {
                eventId,
                content: fakerFR.hacker.phrase(),
                userId: fakerFR.number.int({ min: 3, max: 12 }),
                replies: {
                    createMany: {
                        data: createComments(eventId)
                    }
                },
            }
        })
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });