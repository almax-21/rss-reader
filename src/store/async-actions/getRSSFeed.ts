import { ReactNode } from 'react';
import { IntlShape } from '@formatjs/intl';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { MESSAGES } from '../../i18n/types';
import parseRSS from '../../utils/parseRSS';

interface AsyncFeedActionData {
	feedUrl: string;
	intl: IntlShape<string | ReactNode>;
}

export const getRSSFeed = createAsyncThunk(
	'rss/getRSSFeed',
	async ({ feedUrl, intl }: AsyncFeedActionData, thunkAPI) => {
		try {
			const { data } = await axios.get(
				`https://hexlet-allorigins.herokuapp.com/get?url=${encodeURIComponent(
					feedUrl
				)}`
			);

			const serializedContent: XMLHttpRequestResponseType = data.contents;
			const feedData = parseRSS(serializedContent, feedUrl);

			return feedData;
		} catch (err) {
			return navigator.onLine
				? thunkAPI.rejectWithValue(
						intl.formatMessage({ id: MESSAGES.ERROR_INCORRECT_RSS })
				  )
				: thunkAPI.rejectWithValue(
						intl.formatMessage({ id: MESSAGES.ERROR_NETWORK })
				  );
		}
	}
);
