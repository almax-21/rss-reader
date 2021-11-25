/* eslint @typescript-eslint/no-explicit-any: "off" */

import { useEffect, useState } from 'react';

import { getPagesCount } from '../utils/page';

interface ReturnedHookData {
	totalPages: number;
	setTotalPages: (pagesCount: number) => void;
	activePage: number;
	setActivePage: (activePage: number) => void;
}

const usePaginator = (items: any[], limit: number): ReturnedHookData => {
	const [totalPages, setTotalPages] = useState<number>(1);
	const [activePage, setActivePage] = useState<number>(1);

	useEffect(() => {
		const itemsCount = items.length;
		const newPagesCount = getPagesCount(itemsCount, limit);

		setTotalPages(newPagesCount);
	}, [items]);

	return { totalPages, setTotalPages, activePage, setActivePage };
};

export default usePaginator;
