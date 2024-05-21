"use server";

import prisma from "@common/utils/db";

export const createEvent = async (
    title: string,
    description: string,
    linkTicketing: string,
    adult: boolean,
    publishAt: Date
) => {
    try {
        const newEvent = await prisma.event.create({
            data: {
                title,
                description,
                linkTicketing,
                adult,
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
                publishAt,
                published: false,
                isValid: false
            }
        });
        return newEvent;
    } catch (e) {
        throw e;
    }
}
