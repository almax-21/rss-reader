import type { FC } from 'react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { useTypedSelector } from '@/hooks';
import { MESSAGES } from '@/i18n/types';
import { selectSettings } from '@/store/selectors/settingsSelectors';

export const AppHelmet: FC = () => {
	const { lang } = useTypedSelector(selectSettings);
	const intl = useIntl();

	return (
		<Helmet htmlAttributes={{ lang }}>
			<title>{intl.formatMessage({ id: MESSAGES.MAIN_HEADER })}</title>
			<meta
				content={intl.formatMessage({ id: MESSAGES.DESCRIPTION })}
				name="description"
			/>
			<meta
				content={intl.formatMessage({ id: MESSAGES.KEYWORDS })}
				name="keywords"
			/>
		</Helmet>
	);
};
