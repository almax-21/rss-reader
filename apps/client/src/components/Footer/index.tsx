import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { MESSAGES } from '../../i18n/types';

import './style.scss';

const Footer: FC = () => {
	return (
		<footer className="bg-light border-top p-3">
			<p className="text-center mb-0">
				<FormattedMessage id={MESSAGES.INSPIRED_BY} />
				&nbsp;
				<a
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

export default Footer;
