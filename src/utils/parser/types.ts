export interface ParsedFeed {
	title: string;
	description: string;
}

export interface ParsedPost extends ParsedFeed {
	url: string;
}

export interface ParsedRSS {
	parsedFeed: ParsedFeed;
	parsedPosts: ParsedPost[];
}
