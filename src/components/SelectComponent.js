import React from 'react';

/**
 * Custom dropdown component for selecting an option.
 *
 * @component
 * @param { Object } props
 * @param { Array } props.options - an array of options.
 * @param { function } props.onChange - handles the select box change event.
 * @param { string } props.value - selected value.
 * @param { string }  [ props.ariaLabel ] - label for accessibility.
 * @param { boolean } [ props.ariaRequired ] - indicates if select box is required for accesssibility.
 * @param { string } [ props.role ] - ARIA role attribute for accessibility.
 * @param { string } [ props.id ] - unique identifier for component.
 * @returns { JSX.Element } - rendered component.
 */
const SelectComponent = ( { options, onChange, value, ariaLabel, ariaRequired, role, id } ) => {
	return (
		<select
			onChange = { onChange }
			value = { value }
			aria-label={ ariaLabel }
			aria-required={ ariaRequired }
			role={ role }
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
