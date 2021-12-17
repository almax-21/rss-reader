import React, { FC } from 'react';
import { Spinner } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { FormattedMessage } from 'react-intl';

import { MESSAGES } from '../../i18n/types';

interface MySpinnerProps {
	size?: 'sm' | undefined;
	variant?: Variant;
}

const MySpinner: FC<MySpinnerProps> = ({ size, variant }) => {
	return (
		<Spinner
			animation="border"
			aria-hidden="true"
			as="span"
			role="status"
			size={size}
			variant={variant ? variant : undefined}
		>
			<span className="visually-hidden">
				<FormattedMessage id={MESSAGES.LOADING} />
			</span>
		</Spinner>
	);
};

export default MySpinner;
