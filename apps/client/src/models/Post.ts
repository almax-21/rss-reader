import { POST_STATE_TYPE } from '@/store/types';

interface IPost {
	_id: string;
	feedId: string;
	userId: string;
	title: string;
	description: string;
	url: string;
	imgSrc: string;
	state: POST_STATE_TYPE;
}

export type Post = Readonly<IPost>;
