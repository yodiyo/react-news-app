import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import SelectComponent from './components/SelectComponent';
import { fetchNewsData } from './components/api';
import { formattedDate } from './components/formattedDate';
import Footer from './components/Footer';

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
	 * State for the selected country and selected topic.
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
	const [ isLoading, setIsLoading ] = useState( true );
	const [ error, setError ] = React.useState( null );

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
			if ( ! selectedCountryRef.current[ selectedCountry ] && ! selectedTopicRef.current[ selectedTopic ] ){
				fetchNewsData( selectedCountry, selectedTopic )
				.then( ( data ) => {
					selectedCountryRef.current = selectedCountry;
					selectedTopicRef.current = selectedTopic;
					setIsLoading(false);
					setError(null);
					setNewsData( data );
				})
				.catch( ( error ) => {
					setIsLoading(false);
					setError(error);
					console.error( 'Error setting news data: ', error );
				} )
			}
		}
	}, [ selectedCountry, selectedTopic ] );

	/**
	 * Handles the change event of the select box.
	 *
	 * @param { Object } e - change event object.
	 */
	const handleChangeCountry = e => {
		setSelectedCountry( e.target.value );
	}

	const handleChangeTopic = e => {
		setSelectedTopic( e.target.value );
	}

	return (
		<>
			<Header title="News Headlines from Around the World" />
			{ isLoading &&
				<p className="data-loading">Loading...</p>
			}
			{ error &&
				<>
					<div className="notice">
						<span>{ error.message }</span>
						<p>It looks like we've hit our limit on the API for today. Please return tomorrow for a fresh start! </p>
					</div>
				</>
			}
			{ newsData &&
				<main>
					<form className='newsapp-form'>
						<div className="newsapp-form__select">
							<label htmlFor="selectCountry">Choose a country: </label>
							<SelectComponent
								options={ countryOptions }
								onChange={ handleChangeCountry }
								value={ selectedCountry }
								ariaLabel="Select country"
								id="selectCountry"
							/>
						</div>
						<div className="newsapp-form__select">
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
					<div role="region" aria-live="polite">
						<h2 className="newsapp-listings__heading">Top { topicOptions.find( ( option ) => option.value === selectedTopic )?.label } Headlines in { countryOptions.find( ( option ) => option.value === selectedCountry )?.label }</h2>
					</div>

					<ul className="newsapp-listings__articles">
						{ newsData.articles?.map( ( article, index ) =>
						<li className="newsapp-listings__article" key={ index }>
							<article>
								{/* No alt tag available, so don't send image to a11y api.*/}
								<img className="newsapp-article__image" src={ article.image } alt="" aria-hidden="true" />
								<div className="newsapp-article__meta">
									<p className="newsapp-article__date">{ formattedDate( article.publishedAt ) }</p>
									<p className="newsapp-article__source">{ article.source.name }</p>
								</div>
								<a className="newsapp-article__link" href={ article.url }>{ article.title }</a>

								<p className="newsapp-article__description">{ article.description }</p>
							</article>
						</li>
						) }
					</ul>
				</main>
			}
			<Footer />
		</>
	);
};

export default NewsApp;
