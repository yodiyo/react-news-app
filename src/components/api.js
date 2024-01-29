/**
 * Fetch newsdata from News API based on provided country code.
 *
 * @param { string } country - country code.
 *
 * @returns { Promise<Object> } - a promise that resolves to the fetched data.
 */
const fetchNewsData = ( country ) => {
	const apiKey = 'f9095cd6a5b445a4b094b58b1a2b69a0';
	const apiUrl = `https://newsapi.org/v2/top-headlines?country=${ country }&apiKey=${ apiKey }`;

	return fetch( apiUrl )
		.then( ( response ) => response.json() )
		.catch( ( error ) => {
			console.error( 'Error fetching news data', error );
			throw error;
		} );
};

export { fetchNewsData };
