import React, { FC } from 'react';

import { IntlProvider } from 'react-intl';
import { messages } from '../../i18n/messages';
import useTypedSelector from '../../hooks/useTypedSelector';

import AppHelmet from '../AppHelmet';
import RssContainer from '../RssContainer';
import Footer from '../Footer';

import './App.scss';

const App: FC = () => {
	const { locale } = useTypedSelector((state) => state);

	return (
		<IntlProvider locale={locale} messages={messages[locale]}>
			<AppHelmet />
			<main>
				<RssContainer />
				<Footer />
			</main>
		</IntlProvider>
	);
};

export default App;
