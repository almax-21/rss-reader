import React, { FC } from 'react';

import { getPagesColl } from '../../../utils/page';

import ExtraPagination from './mode/ExtraPagination';
import SimplePagination from './mode/SimplePagination';
import { PAGINATOR_CAPACITY } from './types';

import './style.scss';

interface PaginatorProps {
	totalPages: number;
	activePage: number;
	setActivePage: (page: number) => void;
}

const Paginator: FC<PaginatorProps> = ({
	totalPages,
	activePage,
	setActivePage,
}) => {
	if (totalPages < PAGINATOR_CAPACITY.MIN) {
		return null;
	}

	const pagesColl: number[] = getPagesColl(totalPages);

	const handleSetActivePage = (pageNumber: number) => () => {
		setActivePage(pageNumber);
	};

	return totalPages < PAGINATOR_CAPACITY.EXTRA ? (
		<SimplePagination
			activePage={activePage}
			handleSetActivePage={handleSetActivePage}
			pages={pagesColl}
		/>
	) : (
		<ExtraPagination
			activePage={activePage}
			handleSetActivePage={handleSetActivePage}
			pages={pagesColl}
		/>
	);
};

export default Paginator;
