import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import cn from 'classnames';

import { MESSAGES } from '@/i18n/types';

import { MySpinnerProps } from './types';

import styles from './styles.module.scss';

export const MySpinner: FC<MySpinnerProps> = ({
	small = false,
	isDark = false,
}) => {
	const classes = cn(styles.spinner, {
		[styles['spinner--small']]: small,
		[styles['spinner--dark']]: isDark,
	});

	return (
		<div aria-hidden="true" className={classes} role="status">
			<span className={styles['spinner__ring']}></span>
			<span className={styles['spinner__ring']}></span>
			<span className={styles['spinner__ring']}></span>
			<span className={styles['spinner__ring']}></span>
			<span className="visually-hidden">
				<FormattedMessage id={MESSAGES.LOADING} />
			</span>
		</div>
	);
};
