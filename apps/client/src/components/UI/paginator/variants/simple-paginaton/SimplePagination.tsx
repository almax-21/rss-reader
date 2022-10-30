import type { FC } from 'react';
import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import { MESSAGES } from '@/i18n/types';

import { PaginationInner } from '../../pagination-inner';
import type { PaginationProps } from '../../types';
import { PAGINATOR_CAPACITY } from '../../types';

export const SimplePagination: FC<PaginationProps> = ({
	pages,
	activePage,
	onClick,
}) => {
	const intl = useIntl();

	const shouldShowArrows = pages.length >= PAGINATOR_CAPACITY.MIDPOINT;

	return (
		<Pagination
			aria-label={intl.formatMessage({ id: MESSAGES.PAGINATION })}
			role="navigation"
		>
			{shouldShowArrows && (
				<Pagination.Prev
					disabled={activePage === 1}
					onClick={onClick(activePage - 1)}
				/>
			)}
			<PaginationInner
				activePage={activePage}
				pages={pages}
				onClick={onClick}
			/>
			{shouldShowArrows && (
				<Pagination.Next
					disabled={activePage === pages.length}
					onClick={onClick(activePage + 1)}
				/>
			)}
		</Pagination>
	);
};
