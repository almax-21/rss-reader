import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { MESSAGES } from '../../i18n/types';
import { selectLocale } from '../../store/selectors/locale';

const AppHelmet: FC = () => {
	const locale = useTypedSelector(selectLocale);
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
