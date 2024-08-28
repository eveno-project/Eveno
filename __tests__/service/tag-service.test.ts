import {
	create,
	update,
	deleteOne,
	getAll,
	getTagByName,
	getTagsByIds,
	getTagByNameVerif
} from '@services/tag';
import prisma from '@utils/db';
import Tag from '@interfaces/tag';

// Mocking the Prisma client
jest.mock('@utils/db', () => ({
	tag: {
		create: jest.fn(),
		update: jest.fn(),
		findUnique: jest.fn(),
		delete: jest.fn(),
		findMany: jest.fn(),
	},
}));

describe('Tag Service', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('create', () => {
		it('should create a new tag with a capitalized name', async () => {
			const tag = { name: 'new tag' }; // Corrected to match the expected type
			const expectedTag = { id: 1, name: 'New tag' };

			(prisma.tag.create as jest.Mock).mockResolvedValue(expectedTag);

			const result = await create(tag);

			expect(prisma.tag.create).toHaveBeenCalledWith({
				data: expect.objectContaining({
					name: 'New tag',
				}),
			});
			expect(result).toEqual(expectedTag);
		});


		it('should throw an error if create fails', async () => {
			const tag = { name: 'new tag' }; // Corrected to match the expected type
			(prisma.tag.create as jest.Mock).mockRejectedValue(new Error('Create failed'));

			await expect(create(tag)).rejects.toThrow('Create failed');
		});
	});

	describe('update', () => {
		it('should update an existing tag', async () => {
			const tag: Partial<Tag> = { id: 1, name: 'Updated Tag' };

			await update(tag);

			expect(prisma.tag.update).toHaveBeenCalledWith({
				where: { id: tag.id },
				data: expect.objectContaining({
					name: 'Updated Tag',
				}),
			});
		});

		it('should not update a tag if id is not provided', async () => {
			const tag: Partial<Tag> = { name: 'Updated Tag' };

			await update(tag);

			expect(prisma.tag.update).not.toHaveBeenCalled();
		});

		it('should throw an error if update fails', async () => {
			const tag: Partial<Tag> = { id: 1, name: 'Updated Tag' };
			(prisma.tag.update as jest.Mock).mockRejectedValue(new Error('Update failed'));

			await expect(update(tag)).rejects.toThrow('Update failed');
		});
	});

	describe('deleteOne', () => {
		it('should delete a tag', async () => {
			const mockTag = { id: 1, name: 'Tag1' };
			(prisma.tag.delete as jest.Mock).mockResolvedValue(mockTag);

			const result = await deleteOne(1);

			expect(prisma.tag.delete).toHaveBeenCalledWith({
				where: { id: 1 },
			});
			expect(result).toEqual(mockTag);
		});

		it('should throw an error if deletion fails', async () => {
			(prisma.tag.delete as jest.Mock).mockRejectedValue(new Error('Deletion failed'));

			await expect(deleteOne(999)).rejects.toThrow('Deletion failed');
		});
	});

	describe('getAll', () => {
		it('should return all tags', async () => {
			const mockTags = [
				{ id: 1, name: 'Tag1' },
				{ id: 2, name: 'Tag2' },
			];

			(prisma.tag.findMany as jest.Mock).mockResolvedValue(mockTags);

			const result = await getAll();

			expect(prisma.tag.findMany).toHaveBeenCalled();
			expect(result).toEqual(mockTags);
		});

		it('should throw an error if findMany fails', async () => {
			(prisma.tag.findMany as jest.Mock).mockRejectedValue(new Error('Find failed'));

			await expect(getAll()).rejects.toThrow('Find failed');
		});
	});

	describe('getTagByName', () => {
		it('should return a tag by its name', async () => {
			const mockTag = { id: 1, name: 'Tag1' };

			(prisma.tag.findUnique as jest.Mock).mockResolvedValue(mockTag);

			const result = await getTagByName('Tag1');

			expect(prisma.tag.findUnique).toHaveBeenCalledWith({
				where: { name: 'Tag1' },
			});
			expect(result).toEqual(mockTag);
		});

		it('should return null if no tag is found', async () => {
			(prisma.tag.findUnique as jest.Mock).mockResolvedValue(null);

			const result = await getTagByName('NonExistentTag');

			expect(prisma.tag.findUnique).toHaveBeenCalledWith({
				where: { name: 'NonExistentTag' },
			});
			expect(result).toBeNull();
		});
	});

	describe('getTagsByIds', () => {
		it('should return tags matching the given IDs', async () => {
			const mockTags = [
				{ id: 1, name: 'Tag1' },
				{ id: 2, name: 'Tag2' },
			];
	
			(prisma.tag.findMany as jest.Mock).mockResolvedValue(mockTags);
	
			// Update the input to include both id and name
			const result = await getTagsByIds(mockTags);
	
			expect(prisma.tag.findMany).toHaveBeenCalledWith({
				where: { id: { in: [1, 2] } },
			});
			expect(result).toEqual(mockTags);
		});
	
		it('should throw an error if findMany fails', async () => {
			const mockTags = [
				{ id: 1, name: 'Tag1' },
				{ id: 2, name: 'Tag2' },
			];
	
			(prisma.tag.findMany as jest.Mock).mockRejectedValue(new Error('Find failed'));
	
			await expect(getTagsByIds(mockTags)).rejects.toThrow('Find failed');
		});
	});
	

	describe('getTagByNameVerif', () => {
		it('should return true if the tag exists', async () => {
			(prisma.tag.findUnique as jest.Mock).mockResolvedValue({ id: 1, name: 'Tag1' });

			const result = await getTagByNameVerif('Tag1');

			expect(prisma.tag.findUnique).toHaveBeenCalledWith({
				where: { name: 'Tag1' },
			});
			expect(result).toBe(true);
		});

		it('should return false if the tag does not exist', async () => {
			(prisma.tag.findUnique as jest.Mock).mockResolvedValue(null);

			const result = await getTagByNameVerif('NonExistentTag');

			expect(prisma.tag.findUnique).toHaveBeenCalledWith({
				where: { name: 'NonExistentTag' },
			});
			expect(result).toBe(false);
		});
	});
});
