import React, { FC } from 'react';
import { Pagination } from 'react-bootstrap';

import { PaginationInner } from '../pagination-inner';
import { PaginationProps, PAGINATOR_CAPACITY } from '../types';

export const ExtraPagination: FC<PaginationProps> = ({
	pages,
	activePage,
	handleSetActivePage,
}) => {
	// first pages of pagination
	if (activePage < PAGINATOR_CAPACITY.MIDPOINT) {
		const firstPages = pages.slice(0, PAGINATOR_CAPACITY.MIDPOINT);

		return (
			<Pagination>
				<Pagination.Prev
					disabled={activePage === 1}
					onClick={handleSetActivePage(activePage - 1)}
				/>
				<PaginationInner
					activePage={activePage}
					handleSetActivePage={handleSetActivePage}
					pages={firstPages}
				/>
				<Pagination.Ellipsis disabled />
				<Pagination.Last onClick={handleSetActivePage(pages.length)}>
					{pages.length}
				</Pagination.Last>
				<Pagination.Next
					disabled={activePage === pages.length}
					onClick={handleSetActivePage(activePage + 1)}
				/>
			</Pagination>
		);
	}

	// last pages of pagination
	if (activePage > pages.length - PAGINATOR_CAPACITY.MIDPOINT + 1) {
		const lastPages = pages.slice(-PAGINATOR_CAPACITY.MIDPOINT);

		return (
			<Pagination>
				<Pagination.Prev
					disabled={activePage === 1}
					onClick={handleSetActivePage(activePage - 1)}
				/>
				<Pagination.First onClick={handleSetActivePage(1)}>
					{1}
				</Pagination.First>
				<Pagination.Ellipsis disabled />
				<PaginationInner
					activePage={activePage}
					handleSetActivePage={handleSetActivePage}
					pages={lastPages}
				/>
				<Pagination.Next
					disabled={activePage === pages.length}
					onClick={handleSetActivePage(activePage + 1)}
				/>
			</Pagination>
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
		<Pagination>
			<Pagination.Prev
				disabled={activePage === 1}
				onClick={handleSetActivePage(activePage - 1)}
			/>
			<Pagination.First
				active={activePage === 1}
				onClick={handleSetActivePage(1)}
			>
				{1}
			</Pagination.First>
			<Pagination.Ellipsis disabled />
			<PaginationInner
				disableAnimation
				activePage={activePage}
				handleSetActivePage={handleSetActivePage}
				pages={innerPages}
			/>
			<Pagination.Ellipsis disabled />
			<Pagination.Last
				active={activePage === pages.length}
				onClick={handleSetActivePage(pages.length)}
			>
				{pages.length}
			</Pagination.Last>
			<Pagination.Next
				disabled={activePage === pages.length}
				onClick={handleSetActivePage(activePage + 1)}
			/>
		</Pagination>
	);
};
