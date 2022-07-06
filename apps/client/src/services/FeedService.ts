import { AxiosResponse } from 'axios';

import $api from '@/http';
import { ApiContentData, ApiFeedData } from '@/store/types';
import { FEEDS_URL } from '@/types/constants';
import { ParsedFeedData } from '@/utils/parser/types';

class FeedService {
	static uploadNewFeedData(
		parsedfeedData: ParsedFeedData,
		feedUrl: string
	): Promise<AxiosResponse<ApiFeedData>> {
		return $api.post('/feeds/upload', { ...parsedfeedData, feedUrl });
	}

	static downloadContentData(
		token: string | null
	): Promise<AxiosResponse<ApiContentData>> {
		return $api.get(FEEDS_URL, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	static deleteFeedData(
		id: string,
		timeout = 30000
	): Promise<AxiosResponse<string>> {
		return $api.delete(`/feeds?id=${id}`, { timeout });
	}
}

export default FeedService;
