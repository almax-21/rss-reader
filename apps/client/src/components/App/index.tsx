import React, { FC, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import LoadingBar from 'react-redux-loading-bar';
import { BrowserRouter } from 'react-router-dom';

import useTypedDispatch from '../../hooks/redux/useTypedDispatch';
import useTypedSelector from '../../hooks/redux/useTypedSelector';
import { messages } from '../../i18n/messages';
import userAPI from '../../services/UserService';
import getAllContentFromApi from '../../store/async-actions/getAllContentFromApi';
import { selectLang } from '../../store/selectors/langSelectors';
import { selectUser } from '../../store/selectors/userSelectors';
import Footer from '../Footer';
import Header from '../Header';
import MySpinner from '../UI/MySpinner';

import AppHelmet from './AppHelmet';
import AppRouter from './AppRouter';

import './style.scss';

const App: FC = () => {
	const { isLoading: isAuthPending } = userAPI.useAuthUserQuery();

	const { lang } = useTypedSelector(selectLang);
	const { isAuth, userData } = useTypedSelector(selectUser);

	const dispatch = useTypedDispatch();

	const userToken = userData.token;

	useEffect(() => {
		if (isAuth && userToken) {
			dispatch(getAllContentFromApi(userToken));
		}
	}, [isAuth, userToken]);

	return (
		<IntlProvider locale={lang} messages={messages[lang]}>
			<AppHelmet />
			<LoadingBar className="loading-bar" />
			<BrowserRouter>
				<Header />
				{isAuthPending ? (
					<div className="d-flex justify-content-center mt-5">
						<MySpinner />
					</div>
				) : (
					<AppRouter />
				)}
				<Footer />
			</BrowserRouter>
		</IntlProvider>
	);
};

export default App;
