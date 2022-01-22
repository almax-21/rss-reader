export enum ROUTES {
	ROOT = '/',
	SIGN_UP = '/signup',
	SIGN_IN = '/signin',
}

export interface Route {
	path: string;
	Component: React.ComponentType;
	exact: boolean;
}
