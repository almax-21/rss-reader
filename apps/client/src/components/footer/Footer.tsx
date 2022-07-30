import type { FC } from 'react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import cn from 'classnames';

import { MESSAGES } from '@/i18n/types';

import styles from './styles.module.scss';

export const Footer: FC = () => {
	return (
		<footer className={cn(styles.footer, 'p-3')}>
			<p className="text-center mb-0">
				<FormattedMessage id={MESSAGES.INSPIRED_BY} />
				&nbsp;
				<a
					className={cn(styles.footer__link)}
					href="https://ru.hexlet.io/"
					rel="noreferrer"
					target="_blank"
				>
					<FormattedMessage id={MESSAGES.HEXLET_COMPANY} />
				</a>
			</p>
		</footer>
	);
};
