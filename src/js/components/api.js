/**
 * Fetch newsdata from News API based on provided country code and topic.
 *
 * @param { string } country - country code.
 * @param { string } topic - topic code.
 * @param { number } max - maximum number of articles to fetch (default: 10).
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
			return response.json();
		})
		.catch((error) => {
			console.error('Error fetching news data', error);
			throw error;
		});
};

export { fetchNewsData };
