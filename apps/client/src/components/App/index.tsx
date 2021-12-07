import React, { FC } from 'react';
import { Spinner } from 'react-bootstrap';
import { FormattedMessage, IntlProvider } from 'react-intl';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter } from 'react-router-dom';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { messages } from '../../i18n/messages';
import { MESSAGES } from '../../i18n/types';
import userAPI from '../../services/UserService';
import { selectLocale } from '../../store/selectors/localeSelectors';
import Footer from '../Footer';
import Header from '../Header';
import BackToTopBtn from '../UI/BackToTopBtn';

import AppHelmet from './AppHelmet';
import AppRouter from './AppRouter';

import './style.scss';

const App: FC = () => {
	const locale = useTypedSelector(selectLocale);

	const { isLoading: isAuthPending } = userAPI.useAuthUserQuery(
		localStorage.getItem('token')
	);

	return (
		<IntlProvider locale={locale} messages={messages[locale]}>
			<AppHelmet />
			<LoadingBar className="loading-bar" />
			<BrowserRouter>
				<Header />
				{isAuthPending ? (
					<div className="d-flex justify-content-center mt-5">
						<Spinner
							animation="border"
							aria-hidden="true"
							as="span"
							role="status"
						>
							<span className="visually-hidden">
								<FormattedMessage id={MESSAGES.LOADING} />
							</span>
						</Spinner>
					</div>
				) : (
					<AppRouter />
				)}
				<Footer />
				<BackToTopBtn />
			</BrowserRouter>
		</IntlProvider>
	);
};

export default App;
