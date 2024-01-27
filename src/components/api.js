const apiKey = 'fe49560682c14a77a09b508d4191ae48';

const fetchNewsData = ( country ) => {
	const apiUrl = `https://newsapi.org/v2/top-headlines?country=${ country }&apiKey=${ apiKey }`;

	return fetch( apiUrl )
		.then( ( response ) => response.json() )
		.catch( ( error ) => {
			console.error( 'Error fetching news data', error );
			throw error;
		} );
};

export { fetchNewsData };
