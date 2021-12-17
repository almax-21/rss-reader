import axios, { AxiosResponse } from 'axios';

import { ApiContentData, ApiFeedData } from '../store/types';
import { API_ORIGIN, TOKEN_KEY } from '../types/constants';
import { ParsedFeedData } from '../utils/parser/types';

class FeedService {
	static uploadNewFeedData(
		parsedfeedData: ParsedFeedData,
		feedUrl: string
	): Promise<AxiosResponse<ApiFeedData>> {
		const { href: endpointUrl } = new URL('/feeds/upload', API_ORIGIN);
		const token = localStorage.getItem(TOKEN_KEY);

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
		const { href: endpointUrl } = new URL('/feeds', API_ORIGIN);

		return axios.get(endpointUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	static updateFeedsOrder(
		newOrder: string[]
	): Promise<AxiosResponse<ApiContentData>> {
		const { href: endpointUrl } = new URL('/feeds/order', API_ORIGIN);
		const token = localStorage.getItem(TOKEN_KEY);

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

	static deleteFeedData(
		id: string,
		timeout = 30000
	): Promise<AxiosResponse<string>> {
		const { href: endpointUrl } = new URL(`/feeds?id=${id}`, API_ORIGIN);
		const token = localStorage.getItem(TOKEN_KEY);

		return axios.delete(endpointUrl, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			timeout,
		});
	}
}

export default FeedService;
