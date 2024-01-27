import React, { useState } from 'react';
import SelectComponent from './components/SelectComponent';

const NewsComponent = () => {
	const [ selectedOption, setSelectedOption ] = useState( '' );

	const options = [
		{ value: 'gb', label: 'United Kingdom' },
		{ value: 'us', label: 'United States' },
		{ value: 'fr', label: 'France' },
		{ value: 'au', label: 'Australia' },
		{ value: 'in', label: 'India' }
	];

	const handleSelectChange = e => {
		setSelectedOption( e.target.value );
	}

	return (
		<div>
			<h2>News Headlines from Around the World</h2>
			<SelectComponent options={ options } onChange={ handleSelectChange } />
			<p>selected option: { selectedOption }</p>
		</div>
	)
}


export default NewsComponent;
