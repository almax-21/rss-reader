import Main from '../pages/Main';
import Sign from '../pages/Sign';

import { IRoute, ROUTES } from './types';

export const privateRoutes: IRoute[] = [
	{ path: ROUTES.ROOT, Component: Main, exact: true },
];

export const publicRoutes: IRoute[] = [
	{ path: ROUTES.SIGN_IN, Component: Sign, exact: true },
	{ path: ROUTES.SIGN_UP, Component: Sign, exact: true },
];
