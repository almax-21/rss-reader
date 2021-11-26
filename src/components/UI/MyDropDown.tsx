import React, { FC } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { FormattedMessage } from 'react-intl';

import { POST_TYPE } from '../../store/types';

interface MyDropDownProps<T> {
	variant: Variant;
	title: string;
	values: Array<T>;
	activeValue: T;
	handleSetActiveValue: (value: T) => () => void;
}

const MyDropDown: FC<MyDropDownProps<POST_TYPE>> = ({
	variant,
	title,
	values,
	activeValue,
	handleSetActiveValue,
}) => {
	return (
		<DropdownButton title={title} variant={variant}>
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
