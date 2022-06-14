
import { MainPage, SignPage } from '@/pages';

import { Route, ROUTES } from './types';

export const privateRoutes: Route[] = [
	{ path: ROUTES.ROOT, Component: MainPage, exact: true },
];

export const publicRoutes: Route[] = [
	{ path: ROUTES.SIGN_IN, Component: SignPage, exact: true },
	{ path: ROUTES.SIGN_UP, Component: SignPage, exact: true },
];
