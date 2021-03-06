import type { FC } from 'react';
import React, { useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter } from 'react-router-dom';
import SpeechRecognition from 'react-speech-recognition';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { NetworkTooltip } from '@/components/network-tooltip';
import { MySpinner } from '@/components/UI/my-spinner';
import { AuthContext } from '@/contexts';
import { useNetwork, useTypedDispatch, useTypedSelector } from '@/hooks';
import { messages } from '@/i18n/messages';
import userAPI from '@/services/UserService';
import { getAllContentFromApi } from '@/store/async-actions';
import { selectSettings } from '@/store/selectors/settingsSelectors';
import { selectUser } from '@/store/selectors/userSelectors';

import { AppHelmet } from './app-helmet';
import { AppRouter } from './app-router';

import '@/styles/main.scss';

const SPEECHLY_APP_ID = '4583ba0d-aa26-46cf-a3d3-1e303fe6c5f8';

export const App: FC = () => {
	// we need to auth user after success login (and not during login)
	// because if user loss network connection after login
	// and enter into offline mode (PWA) he get white screen
	const { isLoading: isAuthPending, refetch: refetchAuthQuery } =
		userAPI.useAuthUserQuery();

	const { lang, isDarkTheme } = useTypedSelector(selectSettings);
	const { isAuth, userData } = useTypedSelector(selectUser);

	const dispatch = useTypedDispatch();

	const isOnline = useNetwork();

	const userToken = userData.token;

	useEffect(() => {
		const SpeechlySpeechRecognition =
			createSpeechlySpeechRecognition(SPEECHLY_APP_ID);

		SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);
	}, []);

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
				{!isOnline && <NetworkTooltip />}
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
