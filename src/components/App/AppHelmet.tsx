import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import { selectLocale } from '../../store/selectors/localeSelectors';

const AppHelmet: FC = () => {
	const locale = useTypedSelector(selectLocale);
	const intl = useIntl();

	return (
		<Helmet htmlAttributes={{ lang: locale }}>
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

export default AppHelmet;
