import { LocaleType } from '@/i18n/types';
import { Feed } from '@/models/Feed';
import { Post } from '@/models/Post';
import { User } from '@/models/User';
import { FeedUrlData, PostFilter } from '@/types';

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
	feed: Feed;
	posts: Post[];
}

export interface ApiContentData {
	feeds: Feed[];
	posts: Post[];
}

export interface SettingsState {
	isDarkTheme: boolean;
	isAutoUpdate: boolean;
	lang: LocaleType;
	isSwitchLangInProcess: boolean;
}

export interface UserState {
	isAuth: boolean;
	userData: User;
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
		[key: string]: Feed;
	};
	ids: string[];
	activeFeedId: string;
}

export interface PostsState {
	byFeedId: {
		[key: string]: Post[];
	};
	filter: PostFilter;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
