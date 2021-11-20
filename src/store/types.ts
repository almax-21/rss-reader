import { IFeed } from '../models/IFeed';
import { IPost } from '../models/IPost';
import { rootReducer } from './index';
import { setupStore } from './index';

export enum FEED_LOADED_STATE {
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
	NULL = '',
}

export type FEED_LOADED_STATE_TYPE =
	| FEED_LOADED_STATE.SUCCESS
	| FEED_LOADED_STATE.ERROR
	| FEED_LOADED_STATE.NULL;

export interface RssState {
	isLoading: boolean;
	feedLoadedState: FEED_LOADED_STATE;
	errorMessage: string;
	urls: string[];
	feeds: {
		[key: string]: IFeed;
	};
	posts: IPost[];
	allIds: string[];
}

export interface RssFeedData {
	id: string;
	title: string;
	description: string;
	url: string;
	posts: IPost[];
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
