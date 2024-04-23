/**
 *
 * @param { string } date
 * @returns string
 */
const FormattedDate = ( date ) => {
	const dateObj = new Date(date);
	const lang = navigator.language;
	console.log(dateObj, lang);

	/** Using Intl.DateTimeFormat to output friendly date and time.
	 * More info https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat.
	*/
	const formattedDate = new Intl.DateTimeFormat(
		lang,
		{
			hour   : 'numeric',
			minute : 'numeric',
			weekday: 'long',
			year   : 'numeric',
			month  : 'long',
			day    : 'numeric',
	}).format(dateObj);

	return formattedDate;
};

// export default FormattedDate;
export { FormattedDate };