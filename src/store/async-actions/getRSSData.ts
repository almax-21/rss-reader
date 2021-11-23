import { ReactNode } from 'react';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { IntlShape } from '@formatjs/intl';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuid4 } from 'uuid';

import { MESSAGES } from '../../i18n/types';
import { ParsedRSS, RSSData } from '../../types';
import parseRSS from '../../utils/parseRSS';

interface AsyncFeedActionData {
	feedUrl: string;
	intl: IntlShape<string | ReactNode>;
}

export const getRSSData = createAsyncThunk(
	'rss/getRSSData',
	async ({ feedUrl, intl }: AsyncFeedActionData, thunkAPI) => {
		try {
			thunkAPI.dispatch(showLoading());

			const { data } = await axios.get(
				`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(
					feedUrl
				)}`
			);

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
					isRead: false,
				})),
			};

			return rssData;
		} catch (err) {
			return navigator.onLine
				? thunkAPI.rejectWithValue(
						intl.formatMessage({ id: MESSAGES.ERROR_INCORRECT_RSS })
				  )
				: thunkAPI.rejectWithValue(
						intl.formatMessage({ id: MESSAGES.ERROR_NETWORK })
				  );
		} finally {
			thunkAPI.dispatch(hideLoading());
		}
	}
);
