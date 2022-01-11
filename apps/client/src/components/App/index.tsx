import React, { FC, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import useTypedDispatch from '../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { messages } from '../../i18n/messages';
import userAPI from '../../services/UserService';
import getAllContentFromApi from '../../store/async-actions/getAllContentFromApi';
import { selectSettings } from '../../store/selectors/settingsSelectors';
import { selectUser } from '../../store/selectors/userSelectors';
import Footer from '../Footer';
import Header from '../Header';
import MySpinner from '../UI/MySpinner';

import AppHelmet from './AppHelmet';
import AppRouter from './AppRouter';

import './scss/style.scss';

const App: FC = () => {
	// we need to auth user after success login (and not during login)
	// because if user loss network connection after login
	// and enter into offline mode (PWA) he get white screen
	const { isLoading: isAuthPending, refetch: refetchAuthQuery } =
		userAPI.useAuthUserQuery();

	const { lang, isDarkTheme } = useTypedSelector(selectSettings);
	const { isAuth, userData } = useTypedSelector(selectUser);

	const dispatch = useTypedDispatch();

	const userToken = userData.token;

	useEffect(() => {
		if (isAuth && userToken) {
			dispatch(getAllContentFromApi(userToken));
		}
	}, [isAuth, userToken]);

	useEffect(() => {
		isDarkTheme
			? document.body.classList.add('dark-theme')
			: document.body.classList.remove('dark-theme');
	}, [isDarkTheme]);

	return (
		<IntlProvider locale={lang} messages={messages[lang]}>
			<AppHelmet />
			<LoadingBar className="loading-bar" />
			<BrowserRouter>
				<Header />
				{isAuthPending ? (
					<div className="d-flex justify-content-center mt-5">
						<MySpinner isDark={isDarkTheme ? false : true} />
					</div>
				) : (
					<AuthContext.Provider value={{ refetchAuthQuery }}>
						<AppRouter />
					</AuthContext.Provider>
				)}
				<Footer />
			</BrowserRouter>
		</IntlProvider>
	);
};

export default App;
