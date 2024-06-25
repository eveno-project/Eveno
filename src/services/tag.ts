import Tag from "@interfaces/tag";
import prisma from "@utils/db";
import Localization from "@interfaces/localization";
import User from "@interfaces/user";
import TagDto from "@dto/tag-dto";


export async function create(tag: Tag): Promise<void> {
    try {
        console.log(tag);

        const newTag = await prisma.tag.create({
            data: {
                name: tag.name,
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}




export async function update(tag: Tag): Promise<void> {
    try {
        if (tag.id) {
            await prisma.tag.update({
                where: { id: parseInt(tag.id, 10) },
                data: {
                    name: tag.name,
                }
            });
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}






export async function deleteOne(tagId: number): Promise<void> {
    try {
        await prisma.tag.delete({
            where: { id: parseInt(tagId, 10) }
        });

    } catch (error) {
        console.error(error);
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
        console.error(error);
        throw error;
    }
}


export async function getTagByName(name: string): Promise<Tag | null> {
    try {
        console.log(name);
        const tag = await prisma.tag.findUnique({
            where: { name },
        });

        return tag;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getTagByNameVérif(name: string): Promise<Boolean> {
    try {
        console.log(name);
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