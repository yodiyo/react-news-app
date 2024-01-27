import React from 'react';

const SelectComponent = ( { options, onChange, value } ) => {
	return (
		<select
			onChange = { onChange }
			value = { value }
		>
			{ options.map( ( option, index ) => (
				<option key={ index } value={ option.value } >
					{ option.label }
				</option>
			) ) }
		</select>
	);
};

export default SelectComponent;
