import prisma from "@utils/db";

export async function getUser(email: string) {
	return await prisma.user.findUnique({
		select: {
			id: true,
			username: true,
			email: true,
			role: true,
			adult: true,
			password: true
		},
		where: {email: email},
	});
}

export async function getUsersByRole(id: number) {
	return await prisma.user.findMany({
		select: {
			id: true,
			username: true,
			email: true
		},
		where: {
			role: {
				id
			}
		},
	});
}

export async function deleteUser(username: string) {
	return await prisma.user.delete({
		where: {username: username},
	});
}
