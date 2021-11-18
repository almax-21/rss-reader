import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import useTypedSelector from '../hooks/useTypedSelector';
import { MESSAGES } from '../i18n/types';

const AppHelmet: FC = () => {
	const { locale } = useTypedSelector((state) => state);
	const intl = useIntl();

	return (
		<Helmet htmlAttributes={{ lang: locale }}>
			<title>{intl.formatMessage({ id: MESSAGES.MAIN_HEADER })}</title>
			<meta
				name="description"
				content={intl.formatMessage({ id: MESSAGES.DESCRIPTION })}
			/>
			<meta
				name="keywords"
				content={intl.formatMessage({ id: MESSAGES.KEYWORDS })}
			/>
		</Helmet>
	);
};

export default AppHelmet;
