import Tag from "@interfaces/tag";
import prisma from "@utils/db";

// Fonction pour créer un nouveau tag dans la base de données
export async function create({ name }: Omit<Tag, 'id'>): Promise<Tag> {
    try {
        // Création d'un nouveau tag avec la première lettre en majuscule
        return await prisma.tag.create({
            data: {
                name: name[0].toUpperCase() + name.slice(1), // Met la première lettre en majuscule
            }
        });
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour mettre à jour un tag existant dans la base de données
export async function update(tag: Partial<Tag>): Promise<void> {
    try {
        if (tag.id) { // Vérifie que l'ID du tag est fourni
            await prisma.tag.update({
                where: { id: tag.id }, // Sélection du tag par ID
                data: {
                    name: tag.name, // Mise à jour du nom du tag
                }
            });
        }
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour supprimer un tag de la base de données par son ID
export async function deleteOne(id: number): Promise<Tag> {
    try {
        return await prisma.tag.delete({
            where: { id: id } // Sélection du tag à supprimer par ID
        });
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour récupérer tous les tags de la base de données
export async function getAll(): Promise<Tag[]> {
    try {
        const tags = await prisma.tag.findMany(); // Récupère tous les tags

        // Transformation des tags pour ne retourner que l'ID et le nom
        const transformedTags = tags.map(tag => ({
            id: tag.id,
            name: tag.name,
        }));

        return transformedTags; // Retourne la liste des tags transformés
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour récupérer un tag par son nom
export async function getTagByName(name: string): Promise<Tag | null> {
    try {
        // Recherche un tag unique par son nom
        const tag = await prisma.tag.findUnique({
            where: { name }, // Filtre par nom du tag
        });

        return tag; // Retourne le tag trouvé ou null s'il n'existe pas
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour récupérer plusieurs tags en fournissant une liste de tags avec leurs IDs
export async function getTagsByIds(tags: Tag[]): Promise<Tag[]> {
    try {
        // Extrait les IDs des tags fournis
        const ids = tags.map(tag => tag.id);

        // Recherche les tags dont l'ID est dans la liste
        const result = await prisma.tag.findMany({
            where: {
                id: {
                    in: ids, // Filtre par liste d'IDs
                },
            },
        });

        return result; // Retourne la liste des tags trouvés
    } catch (error) {
        throw error; // Propagation de l'erreur en cas d'échec
    }
}

// Fonction pour vérifier l'existence d'un tag par son nom
export async function getTagByNameVerif(name: string): Promise<Boolean> {
    try {
        // Recherche un tag unique par son nom
        const tag = await prisma.tag.findUnique({
            where: { name }, // Filtre par nom du tag
        });

        if (tag) {
            return true; // Retourne true si le tag existe
        } else {
            return false; // Retourne false si le tag n'existe pas
        }
    } catch (error) {
        return false; // Retourne false en cas d'erreur
    }
}
