import { formattedDate } from './formattedDate';

describe('formattedDate', () => {
	it('returns a non-empty string for a valid date string', () => {
		const result = formattedDate('2024-01-15T12:00:00Z');
		expect(typeof result).toBe('string');
		expect(result.length).toBeGreaterThan(0);
	});

	it('includes the year in the formatted output', () => {
		const result = formattedDate('2024-06-20T08:30:00Z');
		expect(result).toMatch(/2024/);
	});

	it('returns a string for a Unix timestamp', () => {
		const result = formattedDate(1700000000000);
		expect(typeof result).toBe('string');
		expect(result.length).toBeGreaterThan(0);
	});
});
