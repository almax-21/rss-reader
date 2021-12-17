// most used types or common

import { LocaleType } from '../i18n/types';
import { IPost } from '../models/IPost';
import { POST_STATE_TYPE } from '../store/types';

export type TimeoutId = ReturnType<typeof setTimeout>;

export interface SignInUserData {
	username: string;
	password: string;
}

export interface SignUpUserData extends SignInUserData {
	lang: LocaleType;
}

export interface TokenData {
	token: string;
}

export enum SORTS {
	NEW_FIRST = 'NEW_FIRST',
	OLD_FIRST = 'OLD_FIRST',
}

export type SORT_TYPE = typeof SORTS[keyof typeof SORTS];

export interface IPostFilter {
	query: string;
	state: POST_STATE_TYPE;
	sort: SORT_TYPE;
}

export interface PostIdData {
	_id: string;
	feedId: string;
}

export interface FeedUrlData {
	feedId: string;
	url: string;
}

export interface NewPostsData {
	feedId: string;
	newPosts: IPost[];
}
