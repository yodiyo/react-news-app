import React, { useState, useEffect, useRef } from 'react';
import SelectComponent from './components/SelectComponent';
import { fetchNewsData } from './components/api';
import { formattedDate } from './components/formattedDate';

/**
 * React component displaying the top headlines based on the selected country.
 *
 * @component
 *
 * @example
 * Usage in another component:
 * import NewsApp from './NewsApp';
 * <NewsApp />
 *
 * @returns { JSX.Element } React component
 */
const NewsApp = () => {
	/**
	 * State for the selected country.
	 *
	 * @type { string }
	 */
	const [ selectedCountry, setSelectedCountry ] = useState( 'gb' );
	const [ selectedTopic, setSelectedTopic ] = useState( 'general' );

	/**
 	 * State for fetched data.
	 *
	 * @type { Object }
 	 */
	const [ newsData, setNewsData ] = useState( null );

	// Declare a ref object
	const selectedCountryRef = useRef({});
	const selectedTopicRef = useRef({});

	/**
 	 * Countries for the select box.
	 *
	 * @type { Array }
 	 */
	const countryOptions = [
		{ value: 'gb', label: 'United Kingdom' },
		{ value: 'us', label: 'United States' },
		{ value: 'fr', label: 'France' },
		{ value: 'au', label: 'Australia' },
		{ value: 'in', label: 'India' }
	];

	/**
 	 * Topics for the select box.
	 *
	 * @type { Array }
 	 */
	const topicOptions = [
		{ value: 'general', label: 'General' },
		{ value: 'world', label: 'World' },
		{ value: 'nation', label: 'Nation' },
		{ value: 'business', label: 'Business' },
		{ value: 'technology', label: 'Technology' },
		{ value: 'entertainment', label: 'Entertainment' },
		{ value: 'sports', label: 'Sports' },
		{ value: 'science', label: 'Science' },
		{ value: 'health', label: 'Health' }
	];

	/**
     * useEffect hook to fetch news data when the component mounts or when selectedCountry changes.
     */
	useEffect( () => {
		if ( selectedCountry && selectedTopic ) {
			console.log(selectedCountryRef.current);
			console.log(selectedTopicRef.current);

			if ( ! selectedCountryRef.current[ selectedCountry ] && ! selectedTopicRef.current[ selectedTopic ] ){
				fetchNewsData( selectedCountry, selectedTopic )
				.then( ( data ) => {
					selectedCountryRef.current = selectedCountry;
					selectedTopicRef.current = selectedTopic;
					setNewsData( data );
					console.log(data);
				})
				.catch( ( error ) => console.error( 'Error setting news data: ', error ) );
			}
		}
	}, [ selectedCountry, selectedTopic ] );

	/**
	 * Handles the change event of the select box.
	 *
	 * @param { Object } e - change event object.
	 */
	const handleChange = e => {
		setSelectedCountry( e.target.value );
	}

	const handleChangeTopic = e => {
		setSelectedTopic( e.target.value );
	}

	return (
		<>
			<header>
				<h1>News Headlines from Around the World</h1>
			</header>
			<form>
				<div className="form-select">
					<label htmlFor="selectCountry">Choose a country: </label>
					<SelectComponent
						options={ countryOptions }
						onChange={ handleChange }
						value={ selectedCountry }
						ariaLabel="Select country"
						id="selectCountry"
					/>
				</div>
				<div className="form-select">
					<label htmlFor="selectTopic">Choose a topic: </label>
					<SelectComponent
						options={ topicOptions }
						onChange={ handleChangeTopic }
						value={ selectedTopic }
						ariaLabel="Select topic"
						id="selectTopic"
					/>
				</div>
			</form>
			{ newsData &&
				<main>
					<h2>Top { topicOptions.find( ( option ) => option.value === selectedTopic )?.label } Headlines in { countryOptions.find( ( option ) => option.value === selectedCountry )?.label }</h2>
					<ul>
						{ newsData.articles.map( ( article, index ) =>
						<li key={ index }>
							{/* No alt tag available, so don't send image to a11y api.*/}
							<img src={ article.image } alt="" aria-hidden="true" />
							<p>{ article.source.name }</p>
							<a href={ article.url }>{ article.title }</a>
							<p>{ formattedDate( article.publishedAt ) }</p>
							<p>{ article.description }</p>

						</li>
						) }
					</ul>
				</main>
			}
		</>
	);
};

export default NewsApp;
