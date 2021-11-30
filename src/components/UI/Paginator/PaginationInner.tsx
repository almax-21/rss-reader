import React, { FC } from 'react';
import { Pagination } from 'react-bootstrap';
import cn from 'classnames';

import { PaginationInnerProps } from './types';

const PaginationInner: FC<PaginationInnerProps> = ({
	pages,
	activePage,
	handleSetActivePage,
	disableAnimation = false,
}) => (
	<>
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
	</>
);

export default PaginationInner;
