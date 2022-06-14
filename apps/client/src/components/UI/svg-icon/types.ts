export enum SVG_ICON_VARIANTS {
	WIFI_OFF = 'WIFI_OFF',
	SORT = 'NEW_FIRST',
	SORT_REVERSE = 'OLD_FIRST',
	USER = 'USER',
	LANG = 'LANG',
	RELOAD = 'RELOAD',
	MICROPHONE_ON = 'MICROPHONE_ON',
	MICROPHONE_OFF = 'MICROPHONE_OFF',
	SIGN_OUT = 'SIGN_OUT',
	SUCCESS = 'success',
	DANGER = 'danger',
}

export type SVG_ICON_TYPE =
	typeof SVG_ICON_VARIANTS[keyof typeof SVG_ICON_VARIANTS];

export interface SvgIconProps {
	variant: SVG_ICON_TYPE | string;
	className?: string;
	width?: string | number;
	height?: string | number;
	fill?: string;
}
