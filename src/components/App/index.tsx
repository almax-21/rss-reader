import React, { FC } from 'react';

import { IntlProvider } from 'react-intl';
import { LOCALES } from '../../i18n/locales';
import { messages } from '../../i18n/messages';

import RssContainer from '../RssContainer';
import Footer from '../Footer';

import './App.scss';

const locale = LOCALES.RUSSIAN;

const App: FC = () => {
	return (
		<IntlProvider locale={locale} messages={messages[locale]}>
			<main>
				<RssContainer />
				<Footer />
			</main>
		</IntlProvider>
	);
};

export default App;
