import type { LocaleType } from '@/i18n/types';

interface IUser {
	id: string;
	token: string;
	username: string;
	lang: LocaleType;
}

export type User = Readonly<IUser>;
