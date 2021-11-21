import './style.scss';
import React, { FC } from 'react';
import { IntlProvider } from 'react-intl';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { messages } from '../../i18n/messages';
import ContentContainer from '../ContentContainer';
import Footer from '../Footer';
import RSSContainer from '../RSSContainer';
import AppHelmet from './AppHelmet';

const App: FC = () => {
	const { locale } = useTypedSelector((state) => state);

	return (
		<IntlProvider locale={locale} messages={messages[locale]}>
			<AppHelmet />
			<main>
				<RSSContainer />
				<ContentContainer />
			</main>
			<Footer />
		</IntlProvider>
	);
};

export default App;
