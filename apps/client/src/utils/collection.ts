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
