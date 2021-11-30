/* eslint @typescript-eslint/no-explicit-any: "off" */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { pullAllBy } from 'lodash';
import { v4 as uuid4 } from 'uuid';

import ProxyService from '../../services/ProxyService';
import { FeedUrlData, IPost } from '../../types';
import { CheckUpdateData } from '../../types/index';
import parseRSS from '../../utils/parser';
import { ParsedRSS } from '../../utils/parser/types';
import { POST_STATES, RootState } from '../types';

const updatePostsData = createAsyncThunk(
	'rss/updatePostsData',
	async ({ urlData }: CheckUpdateData, thunkAPI) => {
		try {
			const { rss } = thunkAPI.getState() as unknown as RootState;
			const { url, feedId } = urlData;

			const response = await ProxyService.getXML(url);
			const serializedContent = response.data.contents;

			const { parsedPosts } = parseRSS(serializedContent) as ParsedRSS;

			const differencedPosts = pullAllBy(
				parsedPosts,
				rss.posts.byFeedId[feedId],
				'title'
			);

			const newPosts = differencedPosts.map((post) => ({
				...post,
				feedId,
				id: uuid4(),
				state: POST_STATES.UNREAD,
			})) as IPost[];

			return {
				feedId,
				newPosts,
			};
		} catch (err) {
			const message = (err as Error).message;

			console.error(message);
			return thunkAPI.rejectWithValue(message);
		}
	},
	{
		condition: (
			{ urlData, totalUrlCount: dispatchedUrlCount },
			{ getState }
		) => {
			const { rss } = getState() as any;
			const currentUrlsCount = rss.urlDataColl.length;
			const dispatchedFeedId = urlData.feedId;

			if (dispatchedUrlCount !== currentUrlsCount) {
				return false;
			}

			const isStillExist = rss.urlDataColl.some(
				({ feedId }: FeedUrlData) => feedId === dispatchedFeedId
			);

			return isStillExist;
		},
	}
);

export default updatePostsData;
