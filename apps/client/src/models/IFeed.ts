export interface IFeed {
	_id: string;
	userId: string;
	title: string;
	description: string;
	url: string;
}

export interface IFeedWithCounter extends IFeed {
	unreadPostsCount: number;
}
