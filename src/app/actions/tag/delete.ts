"use server";
import Tag from "@interfaces/tag";
import { deleteOne } from "@services/tag";
import { redirect } from "next/navigation";

export default async function deleteTag(_prevState: any, params: FormData) {
    const id = params.get('id');

    if (!id) {
        return {
            errors: "Pas de nom renseigné"
        }
    }

    await deleteOne(parseInt(id));

    redirect('/tag');
}

