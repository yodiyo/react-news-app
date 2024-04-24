/**
 * Custom dropdown component for selecting an option.
 *
 * @component
 * @param { Object } props
 * @param { Array } props.options - an array of options.
 * @param { function } props.onChange - handles the select box change event.
 * @param { string } props.value - selected value.
 * @param { string } [ props.id ] - unique identifier for component.
 * @returns { JSX.Element } - rendered component.
 */
const SelectComponent = ( { options, onChange, value, id } ) => {
	return (
		<select
			onChange = { onChange }
			value = { value }
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
