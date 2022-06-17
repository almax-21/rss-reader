import React, { FC } from 'react';

import { getPagesColl } from '@/utils/page';

import { ExtraPagination } from './variants/extra-paginaton';
import { SimplePagination } from './variants/simple-paginaton';
import { PAGINATOR_CAPACITY } from './types';

// not a module because only bootsrap's classNames
import './style.scss';

interface PaginatorProps {
	totalPages: number;
	activePage: number;
	setActivePage: (page: number) => void;
}

export const Paginator: FC<PaginatorProps> = React.memo(
	({ totalPages, activePage, setActivePage }) => {
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
	}
);

Paginator.displayName = 'Paginator';
