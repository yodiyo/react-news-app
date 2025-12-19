/**
 * Fetch newsdata from News API based on provided country code and topic.
 *
 * @param { string } country - country code.
 * @param { string } topic - topic code.
 * @param { number } max - maximum number of articles to fetch (default: 20).
 *
 * @returns { Promise<Object> } - a promise that resolves to the fetched data.
 */
const fetchNewsData = (country, topic, max = 20) => {
	const apiUrl = `/.netlify/functions/news?country=${encodeURIComponent(country)}&topic=${encodeURIComponent(topic)}&max=${encodeURIComponent(max)}`;

	return fetch(
		apiUrl
	)
		.then(async (response) => {
			if (!response.ok) {
				let bodyText = '';
				try {
					bodyText = await response.text();
				} catch (e) {
					bodyText = '';
				}
				if (response.status === 429) {
					throw new Error('Rate limit reached. Please wait a minute and try again.');
				}
				throw new Error(`News API request failed (HTTP ${response.status})${bodyText ? `: ${bodyText}` : ''}`);
			}

			const contentType = response.headers.get('content-type') || '';
			const raw = await response.text();
			if (raw.trim().startsWith('<') || !contentType.includes('application/json')) {
				throw new Error(
					`Expected JSON but received ${contentType || 'unknown content-type'}. ` +
					`This usually means the Netlify Function isn't running. Start local dev with npm run dev.`
				);
			}

			try {
				return JSON.parse(raw);
			} catch (e) {
				throw new Error(`Invalid JSON response from server: ${raw.slice(0, 120)}`);
			}
		})
		.catch((error) => {
			console.error('Error fetching news data', error);
			throw error;
		});
};

export { fetchNewsData };
