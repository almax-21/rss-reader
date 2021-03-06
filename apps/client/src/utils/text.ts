export const truncateText = (text: string, limit = 100): string => {
	if (text.length > limit) {
		return `${text.slice(0, limit)}...`;
	} else {
		return text;
	}
};

export const filterText = (text: string): string => {
	const TagAndMnemonicRegEx = /(<([^>]+)>)|&\w*;/gi;

	return text.replace(TagAndMnemonicRegEx, ' ');
};

export const getTextValuesFromObject = (obj: { [key: string]: string }) => {
	const textSet = new Set(Object.values(obj));

	return Array.from(textSet).join(' ');
};
