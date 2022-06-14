import React, { FC } from 'react';
import { Redirect, Route } from 'react-router';

import { Notification } from '@/components/UI/Notification';
import useTypedSelector from '@/hooks/redux/useTypedSelector';
import useNotification from '@/hooks/useNotification';
import { privateRoutes, publicRoutes } from '@/router';
import { ROUTES } from '@/router/types';
import { selectNotification } from '@/store/selectors/notificationSelectors';
import { selectAuthState } from '@/store/selectors/userSelectors';

export const AppRouter: FC = React.memo(() => {
	const isAuth = useTypedSelector(selectAuthState);

	const { completedLoadStatus, successMessage, errorMessage } =
		useTypedSelector(selectNotification);

	const { isShowNotification, notificationData, hideNotification } =
		useNotification(completedLoadStatus, successMessage, errorMessage);

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
							<Route
								key={path}
								component={Component}
								exact={exact}
								path={path}
							/>
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
});

AppRouter.displayName = 'AppRouter';
