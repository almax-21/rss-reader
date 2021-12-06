import MainPage from '../pages/MainPage';
import SignPage from '../pages/SignPage';

import { IRoute, ROUTES } from './types';

export const privateRoutes: IRoute[] = [
	{ path: ROUTES.ROOT, Component: MainPage, exact: true },
];

export const publicRoutes: IRoute[] = [
	{ path: ROUTES.SIGN_IN, Component: SignPage, exact: true },
	{ path: ROUTES.SIGN_UP, Component: SignPage, exact: true },
];
