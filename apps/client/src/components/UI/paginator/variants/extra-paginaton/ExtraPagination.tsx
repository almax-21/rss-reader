import type { FC } from 'react';
import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import { MESSAGES } from '@/i18n/types';

import { PaginationInner } from '../../pagination-inner';
import type { PaginationProps } from '../../types';
import { PAGINATOR_CAPACITY } from '../../types';

export const ExtraPagination: FC<PaginationProps> = ({
	pages,
	activePage,
	onClick,
}) => {
	const intl = useIntl();

	const isFirstPageActive = activePage === 1;

	// first pages of pagination
	if (activePage < PAGINATOR_CAPACITY.MIDPOINT) {
		const firstPages = pages.slice(0, PAGINATOR_CAPACITY.MIDPOINT);

		return (
			<Pagination
				aria-label={intl.formatMessage({ id: MESSAGES.PAGINATION })}
				role="navigation"
			>
				<Pagination.Prev
					disabled={isFirstPageActive}
					onClick={onClick(activePage - 1)}
				/>
				<PaginationInner
					activePage={activePage}
					pages={firstPages}
					onClick={onClick}
				/>
				<Pagination.Ellipsis disabled />
				<Pagination.Last onClick={onClick(pages.length)}>
					{pages.length}
				</Pagination.Last>
				<Pagination.Next
					disabled={activePage === pages.length}
					onClick={onClick(activePage + 1)}
				/>
			</Pagination>
		);
	}

	// last pages of pagination
	if (activePage > pages.length - PAGINATOR_CAPACITY.MIDPOINT + 1) {
		const lastPages = pages.slice(-PAGINATOR_CAPACITY.MIDPOINT);

		return (
			<nav>
				<Pagination
					aria-label={intl.formatMessage({ id: MESSAGES.PAGINATION })}
					role="navigation"
				>
					<Pagination.Prev
						disabled={isFirstPageActive}
						onClick={onClick(activePage - 1)}
					/>
					<Pagination.First onClick={onClick(1)}>{1}</Pagination.First>
					<Pagination.Ellipsis disabled />
					<PaginationInner
						activePage={activePage}
						pages={lastPages}
						onClick={onClick}
					/>
					<Pagination.Next
						disabled={activePage === pages.length}
						onClick={onClick(activePage + 1)}
					/>
				</Pagination>
			</nav>
		);
	}

	// middle pages of pagination

	const rangeMin =
		activePage - PAGINATOR_CAPACITY.RANGE < 0
			? 0
			: activePage - PAGINATOR_CAPACITY.RANGE;

	const innerPages = pages
		// cutting off the first and last pages
		.slice(1, pages.length - 1)
		.slice(rangeMin, activePage);

	return (
		<nav>
			<Pagination
				aria-label={intl.formatMessage({ id: MESSAGES.PAGINATION })}
				role="navigation"
			>
				<Pagination.Prev
					disabled={isFirstPageActive}
					onClick={onClick(activePage - 1)}
				/>
				<Pagination.First active={isFirstPageActive} onClick={onClick(1)}>
					{1}
				</Pagination.First>
				<Pagination.Ellipsis disabled />
				<PaginationInner
					activePage={activePage}
					pages={innerPages}
					onClick={onClick}
				/>
				<Pagination.Ellipsis disabled />
				<Pagination.Last
					active={activePage === pages.length}
					onClick={onClick(pages.length)}
				>
					{pages.length}
				</Pagination.Last>
				<Pagination.Next
					disabled={activePage === pages.length}
					onClick={onClick(activePage + 1)}
				/>
			</Pagination>
		</nav>
	);
};
