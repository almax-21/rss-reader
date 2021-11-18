import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

import { IntlProvider } from 'react-intl';
import { messages } from '../../i18n/messages';
import useTypedSelector from '../../hooks/useTypedSelector';

import RssContainer from '../RssContainer';
import Footer from '../Footer';

import './App.scss';

const App: FC = () => {
	const { locale } = useTypedSelector((state) => state);

	return (
		<>
			<Helmet htmlAttributes={{ lang: locale }} />
			<IntlProvider locale={locale} messages={messages[locale]}>
				<main>
					<RssContainer />
					<Footer />
				</main>
			</IntlProvider>
		</>
	);
};

export default App;
