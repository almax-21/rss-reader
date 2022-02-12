import React, { FC } from 'react';
import { Pagination } from 'react-bootstrap';

import { PaginationInner } from '../PaginationInner';
import { PaginationProps } from '../types';

export const SimplePagination: FC<PaginationProps> = ({
	pages,
	activePage,
	handleSetActivePage,
}) => {
	return (
		<Pagination>
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
	);
};
