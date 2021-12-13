import axios, { AxiosResponse } from 'axios';

class PostService {
	static baseUrl = 'https://rss-reader-express-api.herokuapp.com';

	static setPostRead(id: string): Promise<AxiosResponse<string>> {
		const { href: endpointUrl } = new URL('/posts', this.baseUrl);
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
		const { href: endpointUrl } = new URL('/posts/all', this.baseUrl);
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
}

export default PostService;
