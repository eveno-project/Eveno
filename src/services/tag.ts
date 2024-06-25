import Tag from "@interfaces/tag";
import prisma from "@utils/db";
import Localization from "@interfaces/localization";
import User from "@interfaces/user";
import TagDto from "@dto/tag-dto";


export async function create(tag: Tag, req: any): Promise<void> {
    try {


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
        const tags = await prisma.event.findMany();

        const transformedTags = tags.map(tag => ({
            id: tag.id,
            name: tag.adult,
        }));

        return transformedTags;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


