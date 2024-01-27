import React from 'react';

const SelectComponent = ( { options, onChange, value, ariaLabel, ariaRequired, ariaHasPopup, role, id } ) => {
	return (
		<select
			onChange = { onChange }
			value = { value }
			aria-label={ ariaLabel }
			aria-required={ ariaRequired }
			role={ role }
			aria-haspopup={ ariaHasPopup }
			id={ id }
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
