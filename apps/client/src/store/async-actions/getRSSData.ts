import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuid4 } from 'uuid';

import { MESSAGES } from '../../i18n/types';
import ProxyService from '../../services/ProxyService';
import parseRSS from '../../utils/parser';
import {
	requestFailure,
	requestPending,
	requestSuccess,
} from '../slices/notificationSlice';
import { POST_STATES, RSSData } from '../types';

export const getRSSData = createAsyncThunk(
	'rss/getRSSData',
	async (feedUrl: string, thunkAPI) => {
		try {
			thunkAPI.dispatch(requestPending());
			thunkAPI.dispatch(showLoading());

			const response = await ProxyService.getXML(feedUrl);
			const serializedContent = response.data.contents;

			const { parsedFeed, parsedPosts } = parseRSS(serializedContent);

			const feedId = uuid4();

			const rssData: RSSData = {
				feed: {
					...parsedFeed,
					id: feedId,
					url: feedUrl,
				},
				posts: parsedPosts.map((post) => ({
					...post,
					feedId,
					id: uuid4(),
					state: POST_STATES.UNREAD,
				})),
			};

			thunkAPI.dispatch(requestSuccess(MESSAGES.RSS_SUCCESSFULLY_LOADED));

			return rssData;
		} catch (err) {
			const message = (err as Error).message;
			const isTimeoutError = /^timeout.*exceeded$/.test(message);

			if (isTimeoutError) {
				thunkAPI.dispatch(requestFailure(MESSAGES.ERROR_TIMEOUT));
			} else if (message === MESSAGES.ERROR_INCORRECT_RSS) {
				thunkAPI.dispatch(requestFailure(MESSAGES.ERROR_INCORRECT_RSS));
			} else {
				navigator.onLine
					? thunkAPI.dispatch(requestFailure(MESSAGES.ERROR_UNKNOWN))
					: thunkAPI.dispatch(requestFailure(MESSAGES.ERROR_NETWORK));
			}

			return thunkAPI.rejectWithValue('Error');
		} finally {
			thunkAPI.dispatch(hideLoading());
		}
	}
);
