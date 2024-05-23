"use server";

import prisma from "@common/utils/db";

export const createEvent = async (
    title: string,
    description: string,
    linkTicketing: string,
    adult: boolean,
    publishAt: Date,
    address: string,
    city: string,
    zipCode: number,
    regionName: string
): Promise<void> => {
    try {
        const eventLocalizationsData = address && city && zipCode && regionName ? {
            create: {
                address,
                city,
                zipCode,
                regionName,
                latitude: 0,
                longitude: 0
            }
        } : undefined;

        await prisma.event.create({
            data: {
                title,
                description,
                linkTicketing,
                adult,
                createdAt: new Date(),
                updatedAt: new Date(),
                publishAt,
                published: false,
                isValid: false,
                userId: 2,
                ...(eventLocalizationsData && { eventLocalizations: eventLocalizationsData })
            }
        });
    } catch (e) {
        throw e;
    }
}
