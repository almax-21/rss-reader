import React, { FC } from 'react';
import { Pagination } from 'react-bootstrap';

import { PaginationProps, PAGINATOR_CAPACITY } from '../types';

import PaginationMedium from './PaginationMedium';

const ExtraPagination: FC<PaginationProps> = ({
	pages,
	activePage,
	handleSetActivePage,
}) => {
	if (activePage < PAGINATOR_CAPACITY.MIDPOINT) {
		const firstPages = pages.slice(0, PAGINATOR_CAPACITY.MIDPOINT);

		return (
			<Pagination>
				<Pagination.Prev
					disabled={activePage === 1}
					onClick={handleSetActivePage(activePage - 1)}
				/>
				<PaginationMedium
					pages={firstPages}
					activePage={activePage}
					handleSetActivePage={handleSetActivePage}
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
				<PaginationMedium
					pages={lastPages}
					activePage={activePage}
					handleSetActivePage={handleSetActivePage}
				/>
				<Pagination.Next
					disabled={activePage === pages.length}
					onClick={handleSetActivePage(activePage + 1)}
				/>
			</Pagination>
		);
	}

	const leftBorder =
		activePage - PAGINATOR_CAPACITY.MIDDLE_PAGES < 0
			? 0
			: activePage - PAGINATOR_CAPACITY.MIDDLE_PAGES;

	const innerPages = pages
		.slice(1, pages.length - 1)
		.slice(leftBorder, activePage);

	return (
		<Pagination>
			<Pagination.Prev
				onClick={handleSetActivePage(activePage - 1)}
				disabled={activePage === 1}
			/>
			<Pagination.First
				active={activePage === 1}
				onClick={handleSetActivePage(1)}
			>
				{1}
			</Pagination.First>
			<Pagination.Ellipsis disabled />
			<PaginationMedium
				pages={innerPages}
				activePage={activePage}
				handleSetActivePage={handleSetActivePage}
			/>
			<Pagination.Ellipsis disabled />
			<Pagination.Last
				active={activePage === pages.length}
				onClick={handleSetActivePage(pages.length)}
			>
				{pages.length}
			</Pagination.Last>
			<Pagination.Next
				onClick={handleSetActivePage(activePage + 1)}
				disabled={activePage === pages.length}
			/>
		</Pagination>
	);
};

export default ExtraPagination;
