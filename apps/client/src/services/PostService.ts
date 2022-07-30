import type { AxiosResponse } from 'axios';

import $api from '@/http';
import type { Post } from '@/models/Post';
import type { ParsedPost } from '@/utils/parser/types';

class PostService {
	static setPostRead(id: string): Promise<AxiosResponse<string>> {
		return $api.put('/posts', { id });
	}

	static setAllActivePostsRead(feedId: string): Promise<AxiosResponse<string>> {
		return $api.put('/posts/all', { feedId });
	}

	static uploadNewPosts(
		newPosts: ParsedPost[],
		feedId: string,
	): Promise<AxiosResponse<Post[]>> {
		return $api.post('/posts/upload', { newPosts, feedId });
	}

	static replacePosts(
		newPosts: ParsedPost[],
		feedId: string,
	): Promise<AxiosResponse<Post[]>> {
		return $api.post('/posts/replace', { newPosts, feedId });
	}
}

export default PostService;
