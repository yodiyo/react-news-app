/**
 * Fetch newsdata from News API based on provided country code and topic.
 *
 * @param { string } country - country code.
 * @param { string } topic - topic code.
 *
 * @returns { Promise<Object> } - a promise that resolves to the fetched data.
 */
const fetchNewsData = ( country, topic ) => {
	// const apiKey = '73b11fd29d8f3c08c1e155cd289c498d';
	// const apiKey = 'e4b936ab244da3ae1b97fec4f8263641';
	const apiKey = '595f0c3a5404839eb74c6c0cd118bd85';
	const apiUrl = `https://gnews.io/api/v4/top-headlines?country=${ country }&category=${topic}&apikey=${ apiKey }&max=10`;

	return fetch(
			apiUrl
			// './data.json' // test data, to be removed pre-launch.
		)
		.then( ( response ) => response.json() )
		.catch( ( error ) => {
			console.error( 'Error fetching news data', error );
			throw error;
		} );
};

export { fetchNewsData };
