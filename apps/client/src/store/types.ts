import { LocaleType } from '../i18n/types';
import { IFeed } from '../models/IFeed';
import { IPost } from '../models/IPost';
import { IUser } from '../models/IUser';
import { FeedUrlData, IPostFilter } from '../types';

import { rootReducer } from './index';
import { setupStore } from './index';

export enum COMPLETED_LOAD_STATUS {
	SUCCESS = 'SUCCESS',
	FAILURE = 'FAILURE',
	IDLE = '',
}

export enum POST_STATES {
	READ = 'READ',
	UNREAD = 'UNREAD',
	ALL = 'ALL',
}


export type POST_STATE_TYPE = typeof POST_STATES[keyof typeof POST_STATES];

export interface ApiFeedData {
	feed: IFeed;
	posts: IPost[];
}

export interface ApiContentData {
	feeds: IFeed[];
	posts: IPost[];
}

export interface LangState {
	lang: LocaleType;
	isSwitchLangInProcess: boolean;
}

export interface UserState {
	isAuth: boolean;
	userData: IUser;
}

export interface RssState {
	isLoadingFromApi: boolean;
	isLoadingFromRssSource: boolean;
	isFeedDeleteInProcess: boolean;
	urlDataset: FeedUrlData[];
}

export interface NotificationState {
	completedLoadStatus: COMPLETED_LOAD_STATUS;
	successMessage: string;
	errorMessage: string;
}

export interface FeedsState {
	entities: {
		[key: string]: IFeed;
	};
	ids: string[];
	activeFeedId: string;
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
