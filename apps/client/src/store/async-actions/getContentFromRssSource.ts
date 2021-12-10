import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { MESSAGES } from '../../i18n/types';
import FeedService from '../../services/FeedService';
import ProxyService from '../../services/ProxyService';
import parseRSS from '../../utils/parser';
import {
	notificationReqFailure,
	notificationReqPending,
	notificationReqSuccess,
} from '../slices/notificationSlice';

const getContentFromRssSource = createAsyncThunk(
	'content/getContentFromRssSource',
	async (feedUrl: string, thunkAPI) => {
		try {
			thunkAPI.dispatch(notificationReqPending());
			thunkAPI.dispatch(showLoading());

			const proxyResponse = await ProxyService.getXML(feedUrl);
			const serializedContent = proxyResponse.data.contents;

			const parsedFeedData = parseRSS(serializedContent);

			const apiResponse = await FeedService.uploadFeedData(
				parsedFeedData,
				feedUrl
			);

			thunkAPI.dispatch(
				notificationReqSuccess(MESSAGES.RSS_SUCCESSFULLY_LOADED)
			);

			return apiResponse.data;
		} catch (err) {
			const message = (err as Error).message;
			const isTimeoutError = /^timeout.*exceeded$/.test(message);

			if (isTimeoutError) {
				thunkAPI.dispatch(notificationReqFailure(MESSAGES.ERROR_TIMEOUT));
			} else if (message === MESSAGES.ERROR_INCORRECT_RSS) {
				thunkAPI.dispatch(notificationReqFailure(MESSAGES.ERROR_INCORRECT_RSS));
			} else {
				navigator.onLine
					? thunkAPI.dispatch(notificationReqFailure(MESSAGES.ERROR_UNKNOWN))
					: thunkAPI.dispatch(notificationReqFailure(MESSAGES.ERROR_NETWORK));
			}

			return thunkAPI.rejectWithValue(message);
		} finally {
			thunkAPI.dispatch(hideLoading());
		}
	}
);

export default getContentFromRssSource;
