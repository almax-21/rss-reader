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
	feeds: {
		entities: {
			[key: string]: IFeed;
		};
		ids: string[];
	};
	allPosts: IPost[],
	urls: string[],
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
