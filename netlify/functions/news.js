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

		const apiUrl = new URL('https://gnews.io/api/v4/top-headlines');
		apiUrl.searchParams.set('country', country);
		apiUrl.searchParams.set('category', topic);
		apiUrl.searchParams.set('max', String(safeMax));
		apiUrl.searchParams.set('apikey', apiKey);

		const response = await fetch(apiUrl.toString());
		const text = await response.text();

		if (!response.ok) {
			return json(response.status, {
				error: 'Upstream request failed',
				status: response.status,
				body: text
			});
		}

		let data;
		try {
			data = JSON.parse(text);
		} catch (e) {
			return json(502, { error: 'Invalid JSON from upstream' });
		}

		return json(200, data);
	} catch (error) {
		return json(500, { error: 'Unexpected error', detail: String(error?.message || error) });
	}
};
