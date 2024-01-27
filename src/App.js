import React, { useState, useEffect } from 'react';
import SelectComponent from './components/SelectComponent';
import { fetchNewsData } from './components/api';

const App = () => {
	const [ selectedCountry, setSelectedCountry ] = useState( '' );
	const [ newsData, setNewsData ] = useState( null );

	const options = [
		{ value: 'gb', label: 'United Kingdom' },
		{ value: 'us', label: 'United States' },
		{ value: 'fr', label: 'France' },
		{ value: 'au', label: 'Australia' },
		{ value: 'in', label: 'India' }
	];

	useEffect( () => {
		if ( selectedCountry ) {
			fetchNewsData( selectedCountry )
				.then( ( data ) => setNewsData( data ) )
				.catch( ( error ) => console.error( 'Error setting news data: ', error ) );
		}
	})

	const handleSelectChange = e => {
		setSelectedCountry( e.target.value );
	}

	return (
		<div>
			<h2>News Headlines from Around the World</h2>
			<SelectComponent options={ options } onChange={ handleSelectChange } />
			{ newsData && (
				<div>
					<h3>Top headlines in [COUNTRY]</h3>
					<ul>
						{ newsData.articles.map( ( article, index ) => (
						<li key={ index }>{ article.title }</li>
						) ) }
					</ul>
				</div>
			) }
		</div>
	);
};

export default App;