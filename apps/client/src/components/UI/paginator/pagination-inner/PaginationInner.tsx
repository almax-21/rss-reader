import type { FC } from 'react';
import React from 'react';
import { Pagination } from 'react-bootstrap';

import type { PaginationProps } from '../types';

export const PaginationInner: FC<PaginationProps> = ({
	pages,
	activePage,
	onClick,
}) => (
	<>
		{pages.map((page: number) => {
			return (
				<Pagination.Item
					key={page}
					active={page === activePage}
					onClick={onClick(page)}
				>
					{page}
				</Pagination.Item>
			);
		})}
	</>
);
