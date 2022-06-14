import React, { FC } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import { SvgIcon } from '@/components/UI/svg-icon';
import { MESSAGES } from '@/i18n/types';
import { SORTS } from '@/types';

import { FilterSortProps } from './types';

export const FilterSort: FC<FilterSortProps> = ({
	activeSortType,
	classes,
	sortHandler,
}) => {
	const intl = useIntl();

	const sortTypes = Object.values(SORTS);

	return (
		<ButtonGroup
			aria-label={intl.formatMessage({ id: MESSAGES.SORTING_POSTS })}
			className={classes}
			role="tablist"
		>
			{sortTypes.map((type) => {
				const isActive = type === activeSortType;

				return (
					<Button
						key={type}
						active={isActive}
						aria-selected={isActive}
						role="tab"
						title={intl.formatMessage({ id: type })}
						value={type}
						variant="outline-secondary"
						onClick={sortHandler(type)}
					>
						<SvgIcon height="16" variant={type} width="16" />
					</Button>
				);
			})}
		</ButtonGroup>
	);
};
