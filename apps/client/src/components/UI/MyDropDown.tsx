import React, { FC } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { FormattedMessage } from 'react-intl';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { selectSettings } from '../../store/selectors/settingsSelectors';
import { POST_STATE_TYPE } from '../../store/types';

interface MyDropDownProps<T> {
	variant: Variant;
	title: string;
	values: Array<T>;
	activeValue: T;
	handleSetActiveValue: (value: T) => () => void;
}

const MyDropDown: FC<MyDropDownProps<POST_STATE_TYPE>> = ({
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

export default MyDropDown;
