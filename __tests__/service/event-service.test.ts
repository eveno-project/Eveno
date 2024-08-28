import {
	create, update, getById, deleteOne,
	valid, follow, createComment, unFollow,
	getAllValidate, getByUserEmail, getByUserEmailFollow,
	getByTagName, getManyByName, isUserSubscribed
} from '@services/event';
import prisma from '@utils/db';
import Mapper from '@utils/mapper';
import { redirect } from "next/navigation";

// Mock the Prisma client
jest.mock('@utils/db', () => ({
	event: {
		create: jest.fn(),
		update: jest.fn(),
		findUnique: jest.fn(),
		delete: jest.fn(),
		findFirst: jest.fn(),
		findMany: jest.fn(),
	},
	eventTag: {
		deleteMany: jest.fn(),
	},
	eventLocalization: {
		deleteMany: jest.fn(),
	},
	eventSubscribe: {
		create: jest.fn(),
		deleteMany: jest.fn(),
	},
	comment: {
		create: jest.fn(),
	},
}));

jest.mock('next/navigation', () => ({
	redirect: jest.fn(),
}));

jest.mock('next-auth/next', () => ({
	getServerSession: jest.fn(),
}));

jest.mock('@utils/mapper', () => ({
	toEvent: jest.fn(),
}));

describe('Event Service', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('create', () => {
		it('should create a new event', async () => {
			const event = {
				id: 1,
				title: 'Test Event',
				description: 'Test Description',
				startDate: new Date(),
				endDate: new Date(),
				adult: false,
				images: [],
				linkTicketing: 'http://example.com',
				user: { id: 1, email: 'test@example.com' },
				tags: [{ id: 1, name: 'Tag1' }],
				localizations: [],
				networks: [],
				notes: [],
				isValid: false,
				comments: [],
				createdAt: new Date(),
				updatedAt: new Date(),
				published: true,
				eventSubscribes: [],
			};

			await create(event);

			expect(prisma.event.create).toHaveBeenCalledWith({
				data: expect.objectContaining({
					title: 'Test Event',
					description: 'Test Description',
					user: { connect: { id: 1 } },
					eventTags: {
						create: expect.any(Array),
					},
				}),
			});
		});
	});

	describe('update', () => {
		it('should update an existing event', async () => {
			const event = {
				id: 1,
				title: 'Updated Event',
				description: 'Updated Description',
				startDate: new Date(),
				endDate: new Date(),
				adult: false,
				images: [],
				linkTicketing: 'http://example.com',
				user: { id: 1, email: 'test@example.com' },
				tags: [{ id: 1, name: 'Tag1' }],
				localizations: [{ id: 1, longitude: 0, latitude: 0, address: '', city: '', regionName: '', zipCode: 76000 }],
				networks: [],
				notes: [],
				isValid: false,
				comments: [],
				createdAt: new Date(),
				updatedAt: new Date(),
				published: true,
				eventSubscribes: []
			};

			await update(event);

			expect(prisma.eventTag.deleteMany).toHaveBeenCalledWith({
				where: { eventId: event.id },
			});

			expect(prisma.eventLocalization.deleteMany).toHaveBeenCalledWith({
				where: { eventId: event.id },
			});

			expect(prisma.event.update).toHaveBeenCalledWith({
				where: { id: event.id },
				data: expect.objectContaining({
					title: 'Updated Event',
					description: 'Updated Description',
					eventTags: {
						create: expect.any(Array),
					},
					eventLocalizations: {
						create: expect.any(Array),
					},
				}),
			});
		});
	});

	describe('getById', () => {
		it('should redirect if event is not found', async () => {
			(prisma.event.findUnique as jest.Mock).mockResolvedValue(null);

			await getById(999);  // Call the function

			expect(redirect).toHaveBeenCalledWith('/');  // Check if redirect was called with "/"
		});

		it('should throw an error if no user is assigned', async () => {
			const event = {
				id: 1,
				title: 'Test Event',
				description: 'Test Description',
				user: null,
				eventLocalizations: [],
				eventTags: [],
				comments: [],
				eventSubscribes: [],
				eventNotes: [],
				createdAt: new Date(),
				updatedAt: new Date(),
				isValid: true,
				published: true,
			};

			(prisma.event.findUnique as jest.Mock).mockResolvedValue(event);

			await expect(getById(1)).rejects.toThrow('Pas d\'utilisateur d\'assigner');
		});

		it('should return an event if found and user is assigned', async () => {
			const event = {
				id: 1,
				title: 'Test Event',
				description: 'Test Description',
				user: { id: 1, email: 'test@example.com' },
				eventLocalizations: [],
				eventTags: [],
				comments: [],
				eventSubscribes: [],
				eventNotes: [],
				createdAt: new Date(),
				updatedAt: new Date(),
				isValid: true,
				published: true,
			};

			(prisma.event.findUnique as jest.Mock).mockResolvedValue(event);
			(Mapper.toEvent as jest.Mock).mockReturnValue(event);

			const result = await getById(1);

			expect(prisma.event.findUnique).toHaveBeenCalledWith({
				where: { id: 1 },
				include: expect.any(Object),
			});

			expect(result).toEqual(expect.objectContaining({
				title: 'Test Event',
			}));
		});
	});

	describe('deleteOne', () => {
		it('should delete an event by ID', async () => {
			const event = { id: 1, userId: 1 };

			(prisma.event.findFirst as jest.Mock).mockResolvedValue(event);

			const result = await deleteOne(1, 1);

			expect(prisma.event.findFirst).toHaveBeenCalledWith({
				where: { id: 1, userId: 1 },
			});

			expect(prisma.event.delete).toHaveBeenCalledWith({
				where: { id: 1 },
			});

			expect(result).toBe(true);
		});

		it('should return false if event is not found', async () => {
			(prisma.event.findFirst as jest.Mock).mockResolvedValue(null);

			const result = await deleteOne(999, 1);

			expect(result).toBe(false);
		});
	});

	describe('valid', () => {
		it('should validate an event', async () => {
			await valid(1);

			expect(prisma.event.update).toHaveBeenCalledWith({
				where: { id: 1 },
				data: { isValid: true },
			});
		});
	});

	describe('follow', () => {
		it('should allow a user to follow an event', async () => {
			await follow(1, 1);

			expect(prisma.eventSubscribe.create).toHaveBeenCalledWith({
				data: {
					event: { connect: { id: 1 } },
					user: { connect: { id: 1 } },
					type: "",
				},
			});
		});
	});

	describe('unFollow', () => {
		it('should allow a user to unfollow an event', async () => {
			await unFollow(1, 1);

			expect(prisma.eventSubscribe.deleteMany).toHaveBeenCalledWith({
				where: { eventId: 1, userId: 1 },
			});
		});
	});

	describe('createComment', () => {
		it('should allow a user to comment on an event', async () => {
			await createComment(1, 1, "Great event!");

			expect(prisma.comment.create).toHaveBeenCalledWith({
				data: {
					event: { connect: { id: 1 } },
					user: { connect: { id: 1 } },
					content: "Great event!",
				},
			});
		});
	});

	describe('getAllValidate', () => {
		it('should retrieve all validated or non-validated events', async () => {
			(prisma.event.findMany as jest.Mock).mockResolvedValue([]);

			await getAllValidate(true);

			expect(prisma.event.findMany).toHaveBeenCalledWith({
				include: expect.any(Object),
				where: { isValid: true, eventTags: { some: {} } },
				orderBy: { createdAt: undefined },
			});
		});
	});

	describe('getByUserEmail', () => {
		it('should retrieve events by user email', async () => {
			(prisma.event.findMany as jest.Mock).mockResolvedValue([]);

			await getByUserEmail("test@example.com");

			expect(prisma.event.findMany).toHaveBeenCalledWith({
				where: { user: { email: "test@example.com" } },
				include: expect.any(Object),
			});
		});
	});

	describe('getByUserEmailFollow', () => {
		it('should retrieve events followed by a user by email', async () => {
			(prisma.event.findMany as jest.Mock).mockResolvedValue([]);

			await getByUserEmailFollow("test@example.com");

			expect(prisma.event.findMany).toHaveBeenCalledWith({
				where: {
					eventSubscribes: {
						some: { user: { email: "test@example.com" } },
					},
				},
				include: expect.any(Object),
			});
		});
	});

	describe('getByTagName', () => {
		it('should retrieve events by tag name', async () => {
			(prisma.event.findMany as jest.Mock).mockResolvedValue([]);

			await getByTagName("Music");

			expect(prisma.event.findMany).toHaveBeenCalledWith({
				where: { eventTags: { some: { tag: { name: "Music" } } } },
				include: expect.any(Object),
			});
		});
	});

	describe('getManyByName', () => {
		it('should retrieve events by name', async () => {
			(prisma.event.findMany as jest.Mock).mockResolvedValue([]);

			await getManyByName("Festival");

			expect(prisma.event.findMany).toHaveBeenCalledWith({
				where: { title: { contains: "Festival", mode: 'insensitive' } },
				include: expect.any(Object),
			});
		});
	});

	describe('isUserSubscribed', () => {
		it('should check if a user is subscribed to an event', () => {
			const eventSubscribes = [
				{ user: { id: 1 }, event: { id: 1 }, type: 'follow' },
				{ user: { id: 2 }, event: { id: 2 }, type: 'follow' },
			];

			const result = isUserSubscribed(eventSubscribes, 1);
			expect(result).toBe(true);

			const resultNotSubscribed = isUserSubscribed(eventSubscribes, 3);
			expect(resultNotSubscribed).toBe(false);
		});
	});
});
