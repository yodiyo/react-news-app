/**
 * Netlify serverless function that serves as a proxy for the GNews API.
 * 
 * This function fetches top headlines from GNews.io API with filtering by country and category.
 * It includes input validation, response caching, error handling, and rate limit management.
 * 
 * @module NewsFunction
 * 
 * @description
 * - Validates country codes against a whitelist of supported countries
 * - Validates news categories against allowed topics
 * - Implements in-memory caching with TTL (Note: cache is not persistent across serverless invocations)
 * - Handles API rate limiting with proper HTTP status codes
 * - Provides consistent JSON error responses
 * 
 * @param {Object} event - Netlify function event object
 * @param {string} event.httpMethod - HTTP method of the request
 * @param {Object} event.queryStringParameters - Query parameters from the request
 * @param {string} event.queryStringParameters.country - ISO country code (e.g., 'us', 'gb')
 * @param {string} event.queryStringParameters.topic - News category (e.g., 'technology', 'sports')
 * @param {string} event.queryStringParameters.max - Maximum number of articles (1-50, default: 20)
 * 
 * @returns {Promise<Object>} Netlify function response object
 * @returns {number} returns.statusCode - HTTP status code
 * @returns {Object} returns.headers - Response headers including content-type and cache-control
 * @returns {string} returns.body - JSON stringified response body
 * 
 * @requires process.env.GNEWS_API_KEY - GNews API key from environment variables
 * 
 * @example
 * // GET /.netlify/functions/news?country=us&topic=technology&max=10
 * // Returns: { statusCode: 200, headers: {...}, body: "{'articles': [...]}" }
 * 
 * @throws {Error} Returns 500 status for unexpected errors
 * @throws {Error} Returns 400 status for invalid parameters
 * @throws {Error} Returns 429 status when rate limited by upstream API
 * @throws {Error} Returns 502 status for invalid upstream responses
 * 
 * @note The in-memory cache using Map will not persist across serverless function 
 *       invocations, as each invocation may run in a different container. This cache 
 *       will only be effective within a single function instance's lifetime.
 */
const ALLOWED_CATEGORIES = new Set([
	'general',
	'world',
	'nation',
	'business',
	'technology',
	'entertainment',
	'sports',
	'science',
	'health'
]);

const ALLOWED_COUNTRIES = new Set([
	'au',
	'br',
	'ca',
	'cn',
	'eg',
	'fr',
	'de',
	'gr',
	'hk',
	'in',
	'ie',
	'il',
	'it',
	'jp',
	'nl',
	'no',
	'pk',
	'pe',
	'ph',
	'pt',
	'ro',
	'ru',
	'sg',
	'es',
	'se',
	'ch',
	'tw',
	'ua',
	'gb',
	'us'
]);

const json = (statusCode, body, extraHeaders = {}) => ({
	statusCode,
	headers: {
		'content-type': 'application/json; charset=utf-8',
		...extraHeaders
	},
	body: JSON.stringify(body)
});

const CACHE_TTL_MS = 60_000;
const cache = new Map();


const cacheKey = ({ country, topic, max }) => `${country}|${topic}|${max}`;

const getCached = (key) => {
	const entry = cache.get(key);
	if (!entry) return undefined;
	if (Date.now() > entry.expiresAt) {
		cache.delete(key);
		return undefined;
	}
	return entry;
};

const setCached = (key, value) => {
	cache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS });
};

const getRetryAfterSeconds = (response) => {
	const raw = response.headers.get('retry-after');
	if (!raw) return undefined;
	const seconds = Number.parseInt(raw, 10);
	return Number.isFinite(seconds) ? seconds : undefined;
};

exports.handler = async (event) => {
	try {
		if (event.httpMethod !== 'GET') {
			return json(405, { error: 'Method Not Allowed' }, { allow: 'GET' });
		}

		const apiKey = process.env.GNEWS_API_KEY;
		if (!apiKey) {
			return json(500, {
				error: 'Missing server configuration',
				detail: 'Set GNEWS_API_KEY in Netlify environment variables.'
			});
		}

		const params = event.queryStringParameters || {};
		const country = (params.country || '').toLowerCase();
		const topic = (params.topic || '').toLowerCase();
		const max = Number.parseInt(params.max ?? '20', 10);

		if (!ALLOWED_COUNTRIES.has(country)) {
			return json(400, { error: 'Invalid country' });
		}

		if (!ALLOWED_CATEGORIES.has(topic)) {
			return json(400, { error: 'Invalid topic/category' });
		}

		const safeMax = Number.isFinite(max) ? Math.min(Math.max(max, 1), 50) : 20;
		const key = cacheKey({ country, topic, max: safeMax });
		const cached = getCached(key);
		if (cached) {
			return json(200, cached.value, {
				'cache-control': 'public, max-age=60, stale-while-revalidate=300',
				'x-cache': 'HIT'
			});
		}

		const apiUrl = new URL('https://gnews.io/api/v4/top-headlines');
		apiUrl.searchParams.set('country', country);
		apiUrl.searchParams.set('category', topic);
		apiUrl.searchParams.set('max', String(safeMax));
		apiUrl.searchParams.set('apikey', apiKey);

		const response = await fetch(apiUrl.toString());
		const text = await response.text();

		if (!response.ok) {
			const retryAfterSeconds = getRetryAfterSeconds(response);
			if (response.status === 429) {
				return json(429, {
					error: 'Rate limited',
					detail: 'Too many requests to the news provider. Please wait and try again.'
				}, retryAfterSeconds ? { 'retry-after': String(retryAfterSeconds) } : {});
			}

			return json(response.status, {
				error: 'Upstream request failed',
				status: response.status
			});
		}

		let data;
		try {
			data = JSON.parse(text);
		} catch (e) {
			return json(502, { error: 'Invalid JSON from upstream' });
		}

		setCached(key, data);
		return json(200, data, {
			'cache-control': 'public, max-age=60, stale-while-revalidate=300',
			'x-cache': 'MISS'
		});
	} catch (error) {
		return json(500, { error: 'Unexpected error', detail: String(error?.message || error) });
	}
};
