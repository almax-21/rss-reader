import axios, { AxiosResponse } from 'axios';

import { ApiContentData, ApiFeedData } from '../store/types';
import { ParsedFeedData } from '../utils/parser/types';

class FeedService {
	static baseUrl = 'https://rss-reader-backend.herokuapp.com';

	static uploadFeedData(
		parsedfeedData: ParsedFeedData,
		feedUrl: string
	): Promise<AxiosResponse<ApiFeedData>> {
		const { href: endpointUrl } = new URL('/feeds/upload', this.baseUrl);
		const token = localStorage.getItem('token');

		return axios.post(
			endpointUrl,
			{ ...parsedfeedData, feedUrl },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	}

	static downloadContentData(
		token: string | null
	): Promise<AxiosResponse<ApiContentData>> {
		const { href: endpointUrl } = new URL('/feeds', this.baseUrl);

		return axios.get(endpointUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	static updateFeedsOrder(
		newOrder: string[]
	): Promise<AxiosResponse<ApiContentData>> {
		const { href: endpointUrl } = new URL('/feeds/order', this.baseUrl);
		const token = localStorage.getItem('token');

		return axios.post(
			endpointUrl,
			{ newOrder },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
	}

	static deleteFeedData(id: string): Promise<AxiosResponse<string>> {
		const { href: endpointUrl } = new URL(`/feeds?id=${id}`, this.baseUrl);
		const token = localStorage.getItem('token');

		return axios.delete(endpointUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}
}

export default FeedService;
