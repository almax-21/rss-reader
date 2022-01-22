interface IFeed {
	_id: string;
	userId: string;
	title: string;
	description: string;
	url: string;
}

export type Feed = Readonly<IFeed>;

export interface FeedWithCounter extends Feed {
	readonly unreadPostsCount: number;
}
