import { createAsyncThunk } from '@reduxjs/toolkit';

import { MESSAGES } from '../../i18n/types';
import PostService from '../../services/PostService';
import ProxyService from '../../services/ProxyService';
import { FeedUrlData } from '../../types';
import parseRSS from '../../utils/parser/index';
import {
	notificationReqFailure,
	notificationReqPending,
} from '../slices/notificationSlice';

const reloadFeed = createAsyncThunk(
	'content/reloadFeed',
	async (urlData: FeedUrlData, thunkAPI) => {
		try {
			thunkAPI.dispatch(notificationReqPending());

			const { url, feedId } = urlData;

			const response = await ProxyService.getXML(url);
			const serializedContent = response.data.contents;

			const { parsedPosts } = parseRSS(serializedContent);

			const apiResponse = await PostService.replacePosts(parsedPosts, feedId);

			return {
				newPosts: apiResponse.data,
				feedId,
			};
		} catch (err) {
			const message = (err as Error).message;
			const isTimeoutError = /^timeout.*exceeded$/.test(message);

			if (isTimeoutError) {
				thunkAPI.dispatch(notificationReqFailure(MESSAGES.ERROR_TIMEOUT));
			}

			navigator.onLine
				? thunkAPI.dispatch(notificationReqFailure(MESSAGES.ERROR_UNKNOWN))
				: thunkAPI.dispatch(notificationReqFailure(MESSAGES.ERROR_NETWORK));

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export default reloadFeed;
