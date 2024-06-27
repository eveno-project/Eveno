import Tag from "@interfaces/tag";
import prisma from "@utils/db";

export async function create(tag: Partial<Tag>): Promise<void> {
    try {
        if (tag.name) {
            const newTag = await prisma.tag.create({
                data: {
                    name: tag.name,
                }
            });
        }
    } catch (error) {
        throw error;
    }
}

export async function update(tag: Partial<Tag>): Promise<void> {
    try {
        if (tag.id) {
            await prisma.tag.update({
                where: { id: tag.id },
                data: {
                    name: tag.name,
                }
            });
        }
    } catch (error) {
        throw error;
    }
}

export async function deleteOne(id: number): Promise<void> {
    try {
        await prisma.eventTag.deleteMany({
            where: { tagId: id }
        })

        await prisma.tag.delete({
            where: { id: id }
        });

    } catch (error) {
        throw error;
    }
}

export async function getAll(): Promise<Tag[]> {
    try {
        const tags = await prisma.tag.findMany();

        const transformedTags = tags.map(tag => ({
            id: tag.id,
            name: tag.name,
        }));

        return transformedTags;
    } catch (error) {
        throw error;
    }
}

export async function getTagByName(name: string): Promise<Tag | null> {
    try {
        const tag = await prisma.tag.findUnique({
            where: { name },
        });

        return tag;
    } catch (error) {
        throw error;
    }
}

export async function getTagsByIds(tags: Tag[]): Promise<Tag[]> {
    try {
        const ids = tags.map(tag => tag.id);

        const result = await prisma.tag.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });

        return result;
    } catch (error) {
        throw error;
    }
}


export async function getTagByNameVerif(name: string): Promise<Boolean> {
    try {
        const tag = await prisma.tag.findUnique({
            where: { name },
        });

        if (tag) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}
