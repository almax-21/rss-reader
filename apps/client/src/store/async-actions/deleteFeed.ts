import { createAsyncThunk } from '@reduxjs/toolkit';

import { MESSAGES } from '../../i18n/types';
import FeedService from '../../services/FeedService';
import {
	notificationReqFailure,
	notificationReqPending,
} from '../slices/notificationSlice';

const deleteFeed = createAsyncThunk(
	'content/deleteFeed',
	async (id: string, thunkAPI) => {
		try {
			thunkAPI.dispatch(notificationReqPending());

			await FeedService.deleteFeedData(id);

			return id;
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

export default deleteFeed;
