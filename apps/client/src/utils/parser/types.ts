export interface ParsedFeed {
	title: string;
	description: string;
}

export type ParsedPost = ParsedFeed & {
	url: string;
	imgSrc: string;
};

export interface ParsedFeedData {
	parsedFeed: ParsedFeed;
	parsedPosts: ParsedPost[];
}
