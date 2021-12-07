import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuid4 } from 'uuid';

import { MESSAGES } from '../../i18n/types';
import ProxyService from '../../services/ProxyService';
import parseRSS from '../../utils/parser';
import { POST_STATES, RSSData } from '../types';

export const getRSSData = createAsyncThunk(
	'rss/getRSSData',
	async (feedUrl: string, thunkAPI) => {
		try {
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

			return rssData;
		} catch (err) {
			const message = (err as Error).message;
			const isTimeoutError = /^timeout.*exceeded$/.test(message);

			if (isTimeoutError) {
				return thunkAPI.rejectWithValue(MESSAGES.ERROR_TIMEOUT);
			}

			if (message === MESSAGES.ERROR_INCORRECT_RSS) {
				return thunkAPI.rejectWithValue(MESSAGES.ERROR_INCORRECT_RSS);
			}

			return navigator.onLine
				? thunkAPI.rejectWithValue(MESSAGES.ERROR_UNKNOWN)
				: thunkAPI.rejectWithValue(MESSAGES.ERROR_NETWORK);
		} finally {
			thunkAPI.dispatch(hideLoading());
		}
	}
);
