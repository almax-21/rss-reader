// most used types or common

import { IPost } from '../models/IPost';
import { POST_TYPE } from '../store/types';

export type TimeoutId = ReturnType<typeof setTimeout>;

export interface UserData {
	username: string;
	password: string;
}

export interface IPostFilter {
	state: POST_TYPE;
	query: string;
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
