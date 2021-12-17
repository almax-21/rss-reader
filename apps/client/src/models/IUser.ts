import { LocaleType } from '../i18n/types';

export interface IUser {
	id: string;
	token: string;
	username: string;
	isAutoUpdateEnabled: boolean;
	lang: LocaleType;
}
