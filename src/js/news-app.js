import React, { useState, useEffect } from 'react';
import SelectComponent from './components/SelectComponent';
import { fetchNewsData } from './components/api';
import { FormattedDate } from './components/formattedDate';

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
	/* const newsData = {
		"totalArticles": 54904,
		"articles": [
		  {
			"title": "Google's Pixel 7 and 7 Pro’s design gets revealed even more with fresh crisp renders",
			"description": "Now we have a complete image of what the next Google flagship phones will look like. All that's left now is to welcome them during their October announcement!",
			"content": "Google’s highly anticipated upcoming Pixel 7 series is just around the corner, scheduled to be announced on October 6, 2022, at 10 am EDT during the Made by Google event. Well, not that there is any lack of images showing the two new Google phones, b... [1419 chars]",
			"url": "https://www.phonearena.com/news/google-pixel-7-and-pro-design-revealed-even-more-fresh-renders_id142800",
			"image": "https://m-cdn.phonearena.com/images/article/142800-wide-two_1200/Googles-Pixel-7-and-7-Pros-design-gets-revealed-even-more-with-fresh-crisp-renders.jpg",
			"publishedAt": "2022-09-28T08:14:24Z",
			"source": {
			  "name": "PhoneArena",
			  "url": "https://www.phonearena.com"
			}
		  }
		]
	  };*/

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
			fetchNewsData( selectedCountry, selectedTopic )
				.then( ( data ) => {
          setNewsData( data );
          console.log(data);
        })
			.catch( ( error ) => console.error( 'Error setting news data: ', error ) );

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
							<a href={ article.url }>{ article.title }</a>
							<p>{ FormattedDate( article.publishedAt ) }</p>
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
