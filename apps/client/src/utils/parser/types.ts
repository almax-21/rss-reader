export interface ParsedFeed {
	title: string;
	description: string;
}

export interface ParsedPost extends ParsedFeed {
	url: string;
	imgSrc: string;
}

export interface ParsedFeedData {
	parsedFeed: ParsedFeed;
	parsedPosts: ParsedPost[];
}
