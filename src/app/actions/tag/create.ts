"use server";
import Tag from "@interfaces/tag";
import { create, getTagByNameVérif } from "@services/tag";
import { redirect } from "next/navigation";

export default async function createTag(_prevState: any, params: FormData) {
    const name = params.get('name');

    if (!name) {
        return {
            errors: "Pas de nom renseigné"
        }
    }

    const existingTag = await getTagByNameVérif(name.toString());
    
    if (existingTag == true) {
        return {
            errors: "Le tag existe déjà"
        }
    }

    const tag: Tag = { name: name.toString() };

    await create(tag);

    redirect('/tag');
}

