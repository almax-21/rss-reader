export const getPagesCount = (totalCount: number, limit: number): number => {
	return Math.ceil(totalCount / limit) || 1;
};

export const getPagesColl = (pagesCount: number): number[] =>
	Array(pagesCount)
		.fill('*')
		.map((_item, index) => index + 1);

export function showCurrentItems<T>(
	items: T[],
	currentPage: number,
	itemsLimit: number,
): T[] {
	const start = (currentPage - 1) * itemsLimit;
	const end = itemsLimit * currentPage;

	return items.slice(start, end);
}
