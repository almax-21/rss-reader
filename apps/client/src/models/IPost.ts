import { POST_TYPE } from '../store/types';

export interface IPost {
	_id: string;
	feedId: string;
	userId: string;
	title: string;
	description: string;
	url: string;
	state: POST_TYPE;
}