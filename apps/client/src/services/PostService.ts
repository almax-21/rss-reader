import axios, { AxiosResponse } from 'axios';

import { IPost } from '../models/IPost';
import { API_ORIGIN } from '../types/index';
import { ParsedPost } from '../utils/parser/types';

class PostService {
	static setPostRead(id: string): Promise<AxiosResponse<string>> {
		const { href: endpointUrl } = new URL('/posts', API_ORIGIN);
		const token = localStorage.getItem('token');

		return axios.put(
			endpointUrl,
			{ id },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	}

	static setAllActivePostsRead(feedId: string): Promise<AxiosResponse<string>> {
		const { href: endpointUrl } = new URL('/posts/all', API_ORIGIN);
		const token = localStorage.getItem('token');

		return axios.put(
			endpointUrl,
			{ feedId },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	}

	static uploadNewPosts(
		newPosts: ParsedPost[],
		feedId: string
	): Promise<AxiosResponse<IPost[]>> {
		const { href: endpointUrl } = new URL('/posts/upload', API_ORIGIN);
		const token = localStorage.getItem('token');

		return axios.post(
			endpointUrl,
			{ newPosts, feedId },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	}
}

export default PostService;
