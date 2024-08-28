import { Role } from '@constants/role';
import { getUser, getUsersByRole, deleteUser } from '@services/user';
import prisma from '@utils/db';

// Mocking the Prisma client
jest.mock('@utils/db', () => ({
	user: {
		findUnique: jest.fn(),
		findMany: jest.fn(),
		delete: jest.fn(),
	},
}));

describe('User Service', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getUser', () => {
		it('should return a user by email', async () => {
			const mockUser = {
				id: 1,
				email: 'test@example.com',
				username: 'testuser',
				role: 'User',
				adult: true,
				password: 'hashedPassword'
			};

			(prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

			const result = await getUser('test@example.com');

			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				select: {
					id: true,
					username: true,
					email: true,
					role: true,
					adult: true,
					password: true,
				},
				where: { email: 'test@example.com' },
			});
			expect(result).toEqual(mockUser);
		});

		it('should return null if no user is found', async () => {
			(prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

			const result = await getUser('nonexistent@example.com');

			expect(prisma.user.findUnique).toHaveBeenCalledWith({
				select: {
					id: true,
					username: true,
					email: true,
					role: true,
					adult: true,
					password: true,
				},
				where: { email: 'nonexistent@example.com' },
			});
			expect(result).toBeNull();
		});
	});

	describe('getUsersByRole', () => {
		it('should return users by role name', async () => {
			const mockUsers = [
				{ id: 1, email: 'admin1@example.com', role: { name: 'Admin' } },
				{ id: 2, email: 'admin2@example.com', role: { name: 'Admin' } },
			];

			(prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

			const result = await getUsersByRole(Role.ADMIN);

			expect(prisma.user.findMany).toHaveBeenCalledWith({
				select: {
					id: true,
					username: true,
					email: true
				},
				where: {
					role: {
						id: Role.ADMIN,
					}
				},
			});
			expect(result).toEqual(mockUsers);
		});

		it('should return an empty array if no users are found with the given role', async () => {
			(prisma.user.findMany as jest.Mock).mockResolvedValue([]);

			const result = await getUsersByRole(0);

			expect(prisma.user.findMany).toHaveBeenCalledWith({
				select: {
					id: true,
					username: true,
					email: true
				},
				where: {
					role: {
						id: 0,
					}
				},
			});
			expect(result).toEqual([]);
		});
	});

	describe('deleteUser', () => {
		it('should delete a user by username', async () => {
			const mockUser = { id: 1, username: 'testuser' };

			(prisma.user.delete as jest.Mock).mockResolvedValue(mockUser);

			const result = await deleteUser('testuser');

			expect(prisma.user.delete).toHaveBeenCalledWith({
				where: { username: 'testuser' },
			});
			expect(result).toEqual(mockUser);
		});

		it('should throw an error if the user is not found', async () => {
			(prisma.user.delete as jest.Mock).mockRejectedValue(new Error('User not found'));

			await expect(deleteUser('nonexistentuser')).rejects.toThrow('User not found');
		});
	});
});
