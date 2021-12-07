import React, { FC } from 'react';
import { Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { Redirect, Route } from 'react-router';
import { CSSTransition } from 'react-transition-group';

import useTypedSelector from '../../hooks/redux/useTypedSelector';
import useNotification from '../../hooks/useNotification';
import { MESSAGES } from '../../i18n/types';
import { privateRoutes, publicRoutes } from '../../router/index';
import { ROUTES } from '../../router/types';
import userAPI from '../../services/UserService';
import { selectNotification } from '../../store/selectors/notificationSelectors';
import { selectAuthState } from '../../store/selectors/userSelectors';
import Notification from '../UI/Notification';

const AppRouter: FC = () => {
	const { isLoading } = userAPI.useAuthUserQuery(localStorage.getItem('token'));
	const isAuth = useTypedSelector(selectAuthState);

	const { completedLoadStatus, successMessage, errorMessage } =
		useTypedSelector(selectNotification);

	const { isShowNotification, notificationData, hideNotification } =
		useNotification(completedLoadStatus, successMessage, errorMessage);

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center mt-5">
				<Spinner animation="border" aria-hidden="true" as="span" role="status">
					<span className="visually-hidden">
						<FormattedMessage id={MESSAGES.LOADING} />
					</span>
				</Spinner>
			</div>
		);
	}

	return (
		<>
			<Notification
				data={notificationData}
				isShow={isShowNotification}
				onClose={hideNotification}
			/>
			<main>
				{isAuth ? (
					<>
						{privateRoutes.map(({ path, Component, exact }) => (
							<Route key={path} exact={exact} path={path}>
								{({ match }) => (
									<CSSTransition
										unmountOnExit
										classNames="page"
										in={match !== null}
										timeout={300}
									>
										<div className="page">
											<Component />
										</div>
									</CSSTransition>
								)}
							</Route>
						))}
						<Redirect to={ROUTES.ROOT} />
					</>
				) : (
					<>
						{publicRoutes.map(({ path, Component, exact }) => (
							<Route
								key={path}
								component={Component}
								exact={exact}
								path={path}
							/>
						))}
						<Redirect to={ROUTES.SIGN_IN} />
					</>
				)}
			</main>
		</>
	);
};

export default AppRouter;
