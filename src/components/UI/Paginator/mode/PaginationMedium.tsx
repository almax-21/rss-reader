import React, { FC } from 'react';
import { Pagination } from 'react-bootstrap';
import cn from 'classnames';

import { PaginationMediumProps } from '../types';

const PaginationMedium: FC<PaginationMediumProps> = ({
	pages,
	activePage,
	handleSetActivePage,
	disableAnimation = false,
}) => (
	<Pagination>
		{pages.map((page: number) => {
			const classes = cn({
				animated: !disableAnimation && page === activePage,
			});

			return (
				<Pagination.Item
					key={page}
					active={page === activePage}
					className={classes}
					onClick={handleSetActivePage(page)}
				>
					{page}
				</Pagination.Item>
			);
		})}
	</Pagination>
);

export default PaginationMedium;
