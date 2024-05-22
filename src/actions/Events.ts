"use server";

import prisma from "@common/utils/db";
import { Prisma } from "@prisma/client";

export const createEvent = async (
    title: string,
    description: string,
    linkTicketing: string,
    adult: boolean,
    publishAt: Date
): Promise<void> => {
    try {
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
                userId: 1
            }
        });
    } catch (e) {
        throw e;
    }
}