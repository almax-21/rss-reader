import React, { FC } from 'react';
import { Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import { MESSAGES } from '../../i18n/types';

interface MySpinnerProps {
	size?: "sm" | undefined;
}

const MySpinner: FC<MySpinnerProps> = ({ size }) => {
	return (
		<Spinner
			animation="border"
			aria-hidden="true"
			as="span"
			role="status"
			size={size}
		>
			<span className="visually-hidden">
				<FormattedMessage id={MESSAGES.LOADING} />
			</span>
		</Spinner>
	);
};

export default MySpinner;
