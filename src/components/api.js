const apiKey = 'a75a70f3ec9f47aea5e65745fb85bbf1';

const fetchNewsData = ( country ) => {
	const apiUrl = `https://newsapi.org/v2/top-headlines?country=${ country }&apiKey=${ apiKey }`;

	return fetch( apiUrl )
		.then( ( response ) => response.json() )
		.catch( ( error ) => {
			console.error( 'Error fetching news data', error );
		} );
};

export { fetchNewsData };
