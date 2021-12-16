export enum SVG_ICON_VARIANTS {
	SUCCESS = 'success',
	SORT = 'NEW_FIRST',
	SORT_REVERSE = 'OLD_FIRST',
	USER = 'USER',
	LANG = 'LANG',
	SIGN_OUT = 'SIGN_OUT',
	DANGER = 'danger',
}

export type SVG_ICON_TYPE =
	typeof SVG_ICON_VARIANTS[keyof typeof SVG_ICON_VARIANTS];
