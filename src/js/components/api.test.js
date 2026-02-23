import { fetchNewsData } from './api';

describe('fetchNewsData', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('returns parsed JSON on a successful response', async () => {
		const mockData = { articles: [{ title: 'Test Article', url: 'https://example.com' }] };
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			headers: { get: () => 'application/json' },
			text: jest.fn().mockResolvedValue(JSON.stringify(mockData)),
		});

		const result = await fetchNewsData('gb', 'general');
		expect(result).toEqual(mockData);
		expect(global.fetch).toHaveBeenCalledWith(
			'/.netlify/functions/news?country=gb&topic=general&max=20'
		);
	});

	it('uses the provided max parameter', async () => {
		const mockData = { articles: [] };
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			headers: { get: () => 'application/json' },
			text: jest.fn().mockResolvedValue(JSON.stringify(mockData)),
		});

		await fetchNewsData('us', 'technology', 10);
		expect(global.fetch).toHaveBeenCalledWith(
			'/.netlify/functions/news?country=us&topic=technology&max=10'
		);
	});

	it('throws an error on a 429 rate-limit response', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: false,
			status: 429,
			text: jest.fn().mockResolvedValue(''),
		});

		await expect(fetchNewsData('gb', 'general')).rejects.toThrow(
			'Rate limit reached. Please wait a minute and try again.'
		);
	});

	it('throws an error on a non-OK HTTP response', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: false,
			status: 500,
			text: jest.fn().mockResolvedValue('Internal Server Error'),
		});

		await expect(fetchNewsData('gb', 'general')).rejects.toThrow(
			'News API request failed (HTTP 500): Internal Server Error'
		);
	});

	it('throws an error when the response is not JSON', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			headers: { get: () => 'text/html' },
			text: jest.fn().mockResolvedValue('<html>Not JSON</html>'),
		});

		await expect(fetchNewsData('gb', 'general')).rejects.toThrow(
			/Expected JSON but received/
		);
	});

	it('throws an error on malformed JSON', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			headers: { get: () => 'application/json' },
			text: jest.fn().mockResolvedValue('not valid json'),
		});

		await expect(fetchNewsData('gb', 'general')).rejects.toThrow(
			/Invalid JSON response from server/
		);
	});
});
