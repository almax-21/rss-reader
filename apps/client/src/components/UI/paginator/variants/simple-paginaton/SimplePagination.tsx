import React, { FC } from 'react';
import { Pagination } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import { MESSAGES } from '@/i18n/types';

import { PaginationInner } from '../../pagination-inner';
import { PaginationProps } from '../../types';

export const SimplePagination: FC<PaginationProps> = ({
	pages,
	activePage,
	handleSetActivePage,
}) => {
	const intl = useIntl();

	return (
		<nav>
			<Pagination
				aria-label={intl.formatMessage({ id: MESSAGES.PAGINATION })}
				role="navigation"
			>
				{pages.length >= 5 && (
					<Pagination.Prev
						disabled={activePage === 1}
						onClick={handleSetActivePage(activePage - 1)}
					/>
				)}
				<PaginationInner
					activePage={activePage}
					handleSetActivePage={handleSetActivePage}
					pages={pages}
				/>
				{pages.length >= 5 && (
					<Pagination.Next
						disabled={activePage === pages.length}
						onClick={handleSetActivePage(activePage + 1)}
					/>
				)}
			</Pagination>
		</nav>
	);
};
