import './App.scss';
import React, { FC } from 'react';
import { IntlProvider } from 'react-intl';

import useTypedSelector from '../../hooks/useTypedSelector';
import { messages } from '../../i18n/messages';
import AppHelmet from '../AppHelmet';
import ContentContainer from '../ContentContainer';
import Footer from '../Footer';
import RssContainer from '../RssContainer';

const App: FC = () => {
	const { locale } = useTypedSelector((state) => state);

	return (
		<IntlProvider locale={locale} messages={messages[locale]}>
			<AppHelmet />
			<main>
				<RssContainer />
				<ContentContainer />
				<Footer />
			</main>
		</IntlProvider>
	);
};

export default App;
