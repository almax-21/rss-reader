import { Variant } from 'react-bootstrap/esm/types';

import { IFeed } from '../models/IFeed';
import { IPost } from '../models/IPost';

export type TimeoutId = ReturnType<typeof setTimeout>;

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

export interface RSSData {
	feed: IFeed;
	posts: IPost[];
}

export enum NOTIFICATION_VARIANT {
	SUCCESS = 'success',
	WARNING = 'warning',
	ERROR = 'danger',
}

export interface NotificationData {
	variant: Variant;
	message: string;
}
