import DateFormatter from '@services/date';
import dayjs from 'dayjs';

describe('DateFormatter', () => {
	const sampleDate = new Date('2023-08-27T14:45:00Z'); // Example date

	describe('toDayjs', () => {
		it('should convert a Date object to a Dayjs object', () => {
			const dayjsObject = DateFormatter.toDayjs(sampleDate);
			expect(dayjsObject.isValid()).toBe(true);
			expect(dayjsObject.format()).toBe(dayjs(sampleDate).format()); // Check if formatted date matches
		});
	});

	describe('complete', () => {
		it('should format the date correctly in French locale', () => {
			const formattedDate = DateFormatter.complete(sampleDate);
			const expectedDate = dayjs(sampleDate).format('dddd DD MMMM YYYY à HH');

			expect(formattedDate).toBe(expectedDate);
		});

		it('should handle dates in different time zones correctly', () => {
			const dateInDifferentTimezone = new Date('2023-08-27T00:00:00-05:00');
			const formattedDate = DateFormatter.complete(dateInDifferentTimezone);

			const expectedDate = dayjs(dateInDifferentTimezone).format('dddd DD MMMM YYYY à HH');
			expect(formattedDate).toBe(expectedDate);
		});

		it('should return the correct format for dates around midnight', () => {
			const midnightDate = new Date('2023-08-27T00:00:00Z');
			const formattedDate = DateFormatter.complete(midnightDate);

			const expectedDate = dayjs(midnightDate).format('dddd DD MMMM YYYY à HH');
			expect(formattedDate).toBe(expectedDate);
		});
	});
});
