import React, { FC } from 'react';
import { IntlProvider } from 'react-intl';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter } from 'react-router-dom';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { messages } from '../../i18n/messages';
import { selectLocale } from '../../store/selectors/localeSelectors';
import Footer from '../Footer';
import Header from '../Header';
import BackToTopBtn from '../UI/BackToTopBtn';

import AppHelmet from './AppHelmet';
import AppRouter from './AppRouter';

import './style.scss';

const App: FC = () => {
	const locale = useTypedSelector(selectLocale);

	return (
		<IntlProvider locale={locale} messages={messages[locale]}>
			<AppHelmet />
			<LoadingBar className="loading-bar" />
			<BrowserRouter>
				<Header />
				<AppRouter />
				<Footer />
				<BackToTopBtn />
			</BrowserRouter>
		</IntlProvider>
	);
};

export default App;
