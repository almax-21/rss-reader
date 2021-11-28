import { ReactNode } from 'react';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { IntlShape } from '@formatjs/intl';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuid4 } from 'uuid';

import { MESSAGES } from '../../i18n/types';
import parseRSS from '../../utils/parser';
import { ParsedRSS } from '../../utils/parser/types';
import { POST_STATES, RSSData } from '../types';

interface AsyncFeedActionData {
	feedUrl: string;
	intl: IntlShape<string | ReactNode>;
}

const TIMEOUT_MS = 30000; 

export const getRSSData = createAsyncThunk(
	'rss/getRSSData',
	async ({ feedUrl, intl }: AsyncFeedActionData, thunkAPI) => {
		try {
			thunkAPI.dispatch(showLoading());

			const proxedUrl = `https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(
				feedUrl
			)}`;

			const { data } = await axios.get(proxedUrl, { timeout: TIMEOUT_MS });

			const serializedContent: XMLHttpRequestResponseType = data.contents;
			const { parsedFeed, parsedPosts }: ParsedRSS = parseRSS(
				serializedContent
			) as ParsedRSS;

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
			const isTimeoutError = (/^timeout.*exceeded$/).test(message);

			if (isTimeoutError) {
				return thunkAPI.rejectWithValue(
					intl.formatMessage({ id: MESSAGES.ERROR_TIMEOUT })
				);
			}

			if (message === MESSAGES.ERROR_INCORRECT_RSS) {
				return thunkAPI.rejectWithValue(
					intl.formatMessage({ id: MESSAGES.ERROR_INCORRECT_RSS })
				);
			}

			return navigator.onLine
				? thunkAPI.rejectWithValue(
						intl.formatMessage({ id: MESSAGES.ERROR_UNKNOWN })
				  )
				: thunkAPI.rejectWithValue(
						intl.formatMessage({ id: MESSAGES.ERROR_NETWORK })
				  );
		} finally {
			thunkAPI.dispatch(hideLoading());
		}
	}
);
