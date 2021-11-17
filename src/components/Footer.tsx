import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';
import { MESSAGES } from '../i18n/types';

const Footer: FC = () => {
	return (
		<footer className="fixed-bottom bg-light border-top p-3">
			<p className="text-center mb-0">
				<FormattedMessage id={MESSAGES.COPYRIGHT_CREATE} />
				&nbsp;
				<a
					href="https://ru.hexlet.io/programs/frontend/projects/11"
					target="_blank"
					rel="noreferrer"
				>
					<FormattedMessage id={MESSAGES.COPYRIGHT_COMPANY} />
				</a>
			</p>
		</footer>
	);
};

export default Footer;
