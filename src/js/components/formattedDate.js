/**
 *
 * @param { string } date
 * @returns string
 */
const formattedDate = ( date ) => {
	const dateObj = new Date(date);
	const lang = navigator.language;

	/** Using Intl.DateTimeFormat to output friendly date and time.
	 * More info https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat.
	*/
	const formattedDate = new Intl.DateTimeFormat(
		lang,
		{
			hour   : 'numeric',
			minute : 'numeric',
			year   : 'numeric',
			month  : 'short',
			day    : 'numeric',
	}).format(dateObj);

	return formattedDate;
};

// export default FormattedDate;
export { formattedDate };