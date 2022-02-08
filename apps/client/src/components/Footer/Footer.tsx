import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { MESSAGES } from '../../i18n/types';

import './style.scss';

export const Footer: FC = () => {
	return (
		<footer className="footer p-3">
			<p className="footer__text text-center mb-0">
				<FormattedMessage id={MESSAGES.INSPIRED_BY} />
				&nbsp;
				<a
					className="footer__link"
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
