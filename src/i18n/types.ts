import { LOCALES } from './locales';

export interface ILocale {
	[key: string]: string;
}

export interface IMessages {
	[LOCALES.RUSSIAN]: ILocale;
}

export enum MESSAGES {
	MAIN_HEADER = 'MAIN_HEADER',
	LEAD = 'LEAD',
	RSS_INPUT = 'RSS_INPUT',
	ADD = 'ADD',
	LOADING = 'LOADING',
	EXAMPLE = 'EXAMPLE',
	ERROR_EMPTY = 'ERROR_EMPTY',
	ERROR_INVALID_URL = 'ERROR_INVALID_URL',
	ERROR_ALREADY_EXIST = 'ERROR_ALREADY_EXIST',
	COPYRIGHT_CREATE = 'COPYRIGHT_CREATE',
	COPYRIGHT_COMPANY = 'COPYRIGHT_COMPANY',
}