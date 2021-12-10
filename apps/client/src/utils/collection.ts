export const getDiffBy = (
	coll1: any[],
	coll2: any[],
	key: string | number
): any[] => {
	const diff = coll1.filter(
		(item1) => !coll2.some((item2) => item1[key] === item2[key])
	);

	return diff;
};

export const getNewOrder = (
	items: any[],
	currentItemOrder: number,
	newItemOrder: number
): string[] => {
	const newItemsOrder = items.reduce((acc: string[], id: string, index) => {
		if (index === newItemOrder) {
			acc[currentItemOrder] = id;

			return acc;
		}
		if (index === currentItemOrder) {
			acc[newItemOrder] = id;

			return acc;
		}

		acc[index] = id;

		return acc;
	}, []);

	return newItemsOrder;
};
