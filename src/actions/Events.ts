"use server";

import prisma from "@common/utils/db";

export const createEvent = async (
    title: string,
    description: string,
    linkTicketing: string,
    adult: boolean
) => {
    try {
        const newEvent = await prisma.event.create({
            data: {
                title,
                description,
                linkTicketing,
                adult
            }
        });
        return newEvent;
    } catch (e) {
        throw e;
    }
}