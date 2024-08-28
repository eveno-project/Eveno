import prisma from "@utils/db"; // Importation du client Prisma pour interagir avec la base de données

// Fonction pour récupérer un utilisateur unique en fonction de son adresse e-mail
export async function getUser(email: string) {
	return await prisma.user.findUnique({
		// Sélection des champs à inclure dans le résultat
		select: {
			id: true,          // Inclut l'ID de l'utilisateur
			username: true,    // Inclut le nom d'utilisateur
			email: true,       // Inclut l'adresse e-mail
			role: true,        // Inclut le rôle de l'utilisateur
			adult: true,       // Inclut l'information sur si l'utilisateur est adulte
			password: true,    // Inclut le mot de passe (attention à la sensibilité de cette donnée)
			image: true,       // Inclut l'image de profil de l'utilisateur
		},
		// Critère de recherche : correspondance de l'e-mail
		where: { email: email },
	});
}

// Fonction pour récupérer une liste d'utilisateurs ayant un rôle spécifique
export async function getUsersByRole(id: number) {
	return await prisma.user.findMany({
		// Sélection des champs à inclure dans le résultat
		select: {
			id: true,          // Inclut l'ID de l'utilisateur
			username: true,    // Inclut le nom d'utilisateur
			email: true        // Inclut l'adresse e-mail
		},
		// Critère de recherche : correspondance de l'ID du rôle
		where: {
			role: {
				id // Filtre les utilisateurs en fonction de l'ID du rôle
			}
		},
	});
}

// Fonction pour supprimer un utilisateur de la base de données en fonction de son nom d'utilisateur
export async function deleteUser(username: string) {
	return await prisma.user.delete({
		// Critère de suppression : correspondance du nom d'utilisateur
		where: { username: username },
	});
}
