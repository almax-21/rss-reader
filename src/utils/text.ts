export const truncateText = (text: string, limit = 150): string => {
	if (text.length > limit) {
		return `${text.slice(0, limit)}...`;
	} else {
		return text;
	}
};

export const filterTextFromTags = (text: string): string => {
	const regExString = /(<([^>]+)>)/gi;

	return text.replace(regExString, '');
};
