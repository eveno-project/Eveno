import Event from "@interfaces/event";
import prisma from "@utils/db";

export default async function create(event: Event): Promise<void> {
    event.user = { id: 2 };
    try {
        const newEvent = await prisma.event.create({
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
                    create: { ...event.localization, longitude: 0, latitude: 0 }
                }
            }
        });
        console.log({ newEvent });
    } catch (error) {
        console.error(error);
        throw error;
    }
}