import prisma from "@utils/db";
import Role from "@interfaces/role";

export async function getUser(email: string) {
	return prisma.user.findUnique({
		where: {email: email},
	});
}

export async function getUsersByRole(roleName: string) {

	return prisma.user.findMany({
		where: {
			role: {
				name: roleName
			}
		},
	});
}

export async function deleteUser(username: string) {
	return prisma.user.delete({
		where: {username: username},
	});
}
