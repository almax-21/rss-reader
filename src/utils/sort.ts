/* eslint @typescript-eslint/no-explicit-any: "off" */

export const getNewOrder = (
	items: any[],
	currentItemOrder: number,
	newItemOrder: number
) => {
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
