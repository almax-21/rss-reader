import { IFeed } from '../models/IFeed';
import { IPost } from '../models/IPost';
import { rootReducer } from './index';
import { setupStore } from './index';

export interface RssState {
	isLoading: boolean;
	isSuccessfullyLoaded: boolean;
	error: string;
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
