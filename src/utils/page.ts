/* eslint @typescript-eslint/no-explicit-any: "off" */

export const getPagesCount = (totalCount: number, limit: number): number => {
	return Math.ceil(totalCount / limit);
};

export const getPagesColl = (pagesCount: number): number[] =>
	Array(pagesCount)
		.fill('*')
		.map((_item, index) => index + 1);

export const showCurrentItems = (
	items: any[],
	currentPage: number,
	itemsLimit: number
): any[] => {
	const start = (currentPage - 1) * itemsLimit;
	const end = itemsLimit * currentPage;

	return items.slice(start, end);
};
