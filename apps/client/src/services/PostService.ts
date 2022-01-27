import axios, { AxiosResponse } from 'axios';

import { Post } from '../models/Post';
import { API_ORIGIN, TOKEN_KEY } from '../types/constants';
import { ParsedPost } from '../utils/parser/types';

class PostService {
	static setPostRead(id: string): Promise<AxiosResponse<string>> {
		const { href: endpointUrl } = new URL('/posts', API_ORIGIN);
		const token = localStorage.getItem(TOKEN_KEY);

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
		const token = localStorage.getItem(TOKEN_KEY);

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
	): Promise<AxiosResponse<Post[]>> {
		const { href: endpointUrl } = new URL('/posts/upload', API_ORIGIN);
		const token = localStorage.getItem(TOKEN_KEY);

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

	static replacePosts(
		newPosts: ParsedPost[],
		feedId: string
	): Promise<AxiosResponse<Post[]>> {
		const { href: endpointUrl } = new URL('/posts/replace', API_ORIGIN);
		const token = localStorage.getItem(TOKEN_KEY);

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
