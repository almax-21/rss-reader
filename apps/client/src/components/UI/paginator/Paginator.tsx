import type { FC } from 'react';
import React from 'react';

import { getPagesColl } from '@/utils/page';

import { ExtraPagination } from './variants/extra-paginaton';
import { SimplePagination } from './variants/simple-paginaton';
import { PAGINATOR_CAPACITY } from './types';

// not a module because only bootsrap's classNames
import './style.scss';

export interface PaginatorProps {
	totalPages: number;
	activePage: number;
	onClick: (page: number) => () => void;
}

export const Paginator: FC<PaginatorProps> = React.memo(
	({ totalPages, activePage, onClick }) => {
		if (totalPages < PAGINATOR_CAPACITY.MIN) {
			return null;
		}

		const pagesColl = getPagesColl(totalPages);

		const props = {
			activePage,
			pages: pagesColl,
			onClick,
		};

		return (
			<nav>
				{totalPages < PAGINATOR_CAPACITY.EXTRA ? (
					<SimplePagination {...props} />
				) : (
					<ExtraPagination {...props} />
				)}
			</nav>
		);
	},
);

Paginator.displayName = 'Paginator';
