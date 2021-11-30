// most used types or common

import { POST_TYPE } from '../store/types';

export type TimeoutId = ReturnType<typeof setTimeout>;

export interface IFeed {
	id: string;
	title: string;
	description: string;
	url: string;
}

export interface IFeedWithCounter extends IFeed {
	unreadPostsCount: number;
}

export interface IPost {
	id: string;
	feedId: string;
	title: string;
	description: string;
	url: string;
	state: POST_TYPE;
}

export interface IPostFilter {
	state: POST_TYPE;
	query: string;
}

export interface PostIdData {
	id: string;
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
