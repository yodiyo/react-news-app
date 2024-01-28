/**
 * Fetch newsdata from News API based on provided country code.
 *
 * @param { string } country - country code.
 *
 * @returns { Promise<Object> } - a promise that resolves to the fetched data.
 */
const fetchNewsData = ( country ) => {
	const apiKey = 'fe49560682c14a77a09b508d4191ae48';
	const apiUrl = `https://newsapi.org/v2/top-headlines?country=${ country }&apiKey=${ apiKey }`;

	return fetch( apiUrl )
		.then( ( response ) => response.json() )
		.catch( ( error ) => {
			console.error( 'Error fetching news data', error );
			throw error;
		} );
};

export { fetchNewsData };
