// most used types or common

export type TimeoutId = ReturnType<typeof setTimeout>;

export interface IFeed {
	id: string;
	title: string;
	description: string;
	url: string;
	postsCount?: number;
}

export interface IPost {
	id: string;
	feedId: string;
	title: string;
	description: string;
	url: string;
	isRead: boolean;
}

export interface PostIDs {
	id: string;
	feedId: string;
}

export interface FeedUrlData {
	feedId: string;
	url: string;
}
