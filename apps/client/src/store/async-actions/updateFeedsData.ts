import { createAsyncThunk } from '@reduxjs/toolkit';

import PostService from '@/services/PostService';
import ProxyService from '@/services/ProxyService';
import type { FeedUrlData } from '@/types';
import { getDiffBy } from '@/utils/collection';
import parseRSS from '@/utils/parser';

import type { RootState } from '../types';

export const updateFeedsData = createAsyncThunk(
	'content/updateFeedsData',
	async (urlData: FeedUrlData, thunkAPI) => {
		try {
			const { posts } = thunkAPI.getState() as unknown as RootState;
			const { url, feedId } = urlData;

			const response = await ProxyService.getXML(url);
			const serializedContent = response.data.contents;

			const { parsedPosts } = parseRSS(serializedContent);

			const differencedPosts = getDiffBy(
				parsedPosts,
				posts.byFeedId[feedId],
				'title'
			);

			const apiResponse = await PostService.uploadNewPosts(
				differencedPosts,
				feedId
			);

			return {
				newPosts: apiResponse.data,
				feedId,
			};
		} catch (err) {
			const message = (err as Error).message;

			console.error(message);
			return thunkAPI.rejectWithValue(message);
		}
	},
	{
		condition: (urlData, { getState }) => {
			const { rssMeta, settings } = getState() as any;
			const { isAutoUpdate } = settings;

			const dispatchedFeedId = urlData.feedId;

			const isFeedStillExist = rssMeta.urlDataset.some(
				({ feedId }: FeedUrlData) => feedId === dispatchedFeedId
			);

			return isAutoUpdate && isFeedStillExist;
		},
	}
);
