import { FeedUrlData, IFeed, IPost, IPostFilter } from '../types';

import { rootReducer } from './index';
import { setupStore } from './index';

export enum FEED_LOADED_STATES {
	SUCCESS = 'SUCCESS',
	ERROR = 'ERROR',
	NULL = '',
}

export enum POST_STATES {
	READ = 'READ',
	UNREAD = 'UNREAD',
	ALL = 'ALL',
}

export type POST_TYPE = typeof POST_STATES[keyof typeof POST_STATES];

export interface RSSData {
	feed: IFeed;
	posts: IPost[];
}

export interface RssState {
	isLoading: boolean;
	feedLoadedState: FEED_LOADED_STATES;
	errorMessage: string;
	urlDataset: FeedUrlData[];
}

export interface FeedsState {
	entities: {
		[key: string]: IFeed;
	};
	ids: string[];
	activeFeedId: string | null;
}

export interface PostsState {
	byFeedId: {
		[key: string]: IPost[];
	};
	filter: IPostFilter;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
