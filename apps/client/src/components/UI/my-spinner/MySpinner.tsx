import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import cn from 'classnames';

import { MESSAGES } from '@/i18n/types';

import './style.scss';

interface MySpinnerProps {
	small?: boolean;
	isDark?: boolean;
}

export const MySpinner: FC<MySpinnerProps> = ({ small = false, isDark = false }) => {
	const classes = cn('spinner', {
		'spinner--small': small,
		'spinner--dark': isDark,
	});

	return (
		<div aria-hidden="true" className={classes} role="status">
			<span className="spinner__ring"></span>
			<span className="spinner__ring"></span>
			<span className="spinner__ring"></span>
			<span className="spinner__ring"></span>
			<span className="visually-hidden">
				<FormattedMessage id={MESSAGES.LOADING} />
			</span>
		</div>
	);
};
