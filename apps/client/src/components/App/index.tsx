import React, { FC } from 'react';
import { IntlProvider } from 'react-intl';
import LoadingBar from 'react-redux-loading-bar';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { messages } from '../../i18n/messages';
import { selectLocale } from '../../store/selectors/localeSelectors';
import ContentContainer from '../containers/ContentContainer';
import RSSContainer from '../containers/RSSContainer';
import Footer from '../Footer';
import BackToTopBtn from '../UI/BackToTopBtn';

import AppHelmet from './AppHelmet';

import './style.scss';

const App: FC = () => {
	const locale = useTypedSelector(selectLocale);

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
