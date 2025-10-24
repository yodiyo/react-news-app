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
	const apiKey = process.env.REACT_APP_NEWSAPI;
	const apiUrl = `https://gnews.io/api/v4/top-headlines?country=${country}&category=${topic}&apikey=${apiKey}&max=${max}`;

	return fetch(
		apiUrl
		//'./data.json' // test data, to be removed pre-launch.
	)
		.then((response) => {
			if (!response.ok) {
				console.log(response.json);
				throw new Error(`Status: ${response.status}` || 'Network response was not ok');
			}
			return response.json();
		})
		.catch((error) => {
			console.error('Error fetching news data', error);
			throw error;
		});
};

export { fetchNewsData };
