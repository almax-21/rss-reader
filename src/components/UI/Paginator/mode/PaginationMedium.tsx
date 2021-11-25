import React, { FC } from 'react';
import { Pagination } from 'react-bootstrap';

import { PaginationProps } from '../types';

const PaginationMedium: FC<PaginationProps> = ({
	pages,
	activePage,
	handleSetActivePage,
}) => (
	<Pagination>
		{pages.map((pageNumber: number) => {
			return (
				<Pagination.Item
					key={pageNumber}
					active={pageNumber === activePage}
					onClick={handleSetActivePage(pageNumber)}
				>
					{pageNumber}
				</Pagination.Item>
			);
		})}
	</Pagination>
);

export default PaginationMedium;
