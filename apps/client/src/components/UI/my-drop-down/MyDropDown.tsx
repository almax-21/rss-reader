import type { FC } from 'react';
import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { useTypedSelector } from '@/hooks';
import { selectSettings } from '@/store/selectors/settingsSelectors';
import type { POST_STATE_TYPE } from '@/store/types';

import type { MyDropDownProps } from './types';

export const MyDropDown: FC<MyDropDownProps<POST_STATE_TYPE>> = ({
	variant,
	title,
	values,
	activeValue,
	handleSetActiveValue,
}) => {
	const { isDarkTheme } = useTypedSelector(selectSettings);

	return (
		<DropdownButton
			menuVariant={isDarkTheme ? 'dark' : undefined}
			title={title}
			variant={variant}
		>
			{values.map((value) => (
				<Dropdown.Item
					key={value}
					active={value === activeValue}
					onClick={handleSetActiveValue(value)}
				>
					<FormattedMessage id={value} />
				</Dropdown.Item>
			))}
		</DropdownButton>
	);
};
