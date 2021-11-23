import React, { FC } from 'react';
import { IntlProvider } from 'react-intl';
import LoadingBar from 'react-redux-loading-bar';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { messages } from '../../i18n/messages';
import ContentContainer from '../ContentContainer';
import Footer from '../Footer';
import RSSContainer from '../RSSContainer';
import BackToTopBtn from '../UI/BackToTopBtn';

import AppHelmet from './AppHelmet';

import './style.scss';

const App: FC = () => {
	const { locale } = useTypedSelector((state) => state);

	return (
		<IntlProvider locale={locale} messages={messages[locale]}>
			<AppHelmet />
			<LoadingBar className="loading-bar" />
			<main>
				<RSSContainer />
				<ContentContainer />
			</main>
			<Footer />
			<BackToTopBtn />
		</IntlProvider>
	);
};

export default App;
