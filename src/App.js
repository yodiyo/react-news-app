import React, { useState, useEffect } from 'react';
import SelectComponent from './components/SelectComponent';
import { fetchNewsData } from './components/api';

const App = () => {
	const [ selectedCountry, setSelectedCountry ] = useState( 'gb' );
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
	}, [ selectedCountry ] );

	const handleSelectChange = e => {
		setSelectedCountry( e.target.value );
	}

	return (
		<section>
			<h2>News Headlines from Around the World</h2>
			<label htmlFor="selectCountry">Choose a country: </label>
			<SelectComponent
				options={ options }
				onChange={ handleSelectChange }
				value={ selectedCountry }
				ariaLabel="Select country"
				id="selectCountry"
			/>
			{ newsData &&
				<div>
					<h3>Top Headlines in { options.find( ( option ) => option.value === selectedCountry )?.label }</h3>
					<ul>
						{ newsData.articles.slice( 0, 5 ).map( ( article, index ) =>
						<li key={ index }>{ article.title }</li>
						) }
					</ul>
				</div>
			}
		</section>
	);
};

export default App;
