const filterTextFromTags = (text: string): string => {
	const regExString = /(<([^>]+)>)/gi;

	return text.replace(regExString, '');
};

export default filterTextFromTags;
